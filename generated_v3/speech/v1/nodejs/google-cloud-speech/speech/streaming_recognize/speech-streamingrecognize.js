// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START speech_v1_speech_streaming_recognize]
'use strict';

const {SpeechClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Transcribes audio data using bidirectional streaming recognition.
 *
 * @param {Buffer|string} audioContent - The audio data to transcribe.
 */
async function streamingRecognize(audioContent) {
  try {
    const streamingConfig = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
      interimResults: false,
    };

    await new Promise((resolve, reject) => {
      const recognizeStream = client
        .streamingRecognize(streamingConfig)
        .on('error', reject)
        .on('data', response => {
          const results = response.results || [];
          for (const result of results) {
            const alternatives = result.alternatives || [];
            for (const alternative of alternatives) {
              console.log(`Transcription: ${alternative.transcript}`);
            }
          }
        })
        .on('end', () => {
          console.log('Streaming recognition complete.');
          resolve();
        });

      // Transmit the audio content chunk in the stream.
      const chunk =
        audioContent && audioContent.audioContent
          ? audioContent.audioContent
          : audioContent;
      recognizeStream.write(chunk);
      recognizeStream.end();
    });
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else {
      console.error(`Streaming recognition error: ${err.message}`);
    }
  }
}

module.exports = { streamingRecognize };
// [END speech_v1_speech_streaming_recognize]
