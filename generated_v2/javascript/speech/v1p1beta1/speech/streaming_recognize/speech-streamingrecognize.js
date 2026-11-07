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

// [START speech_v1p1beta1_speech_streaming_recognize]
'use strict';

const {SpeechClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Transcribes streaming audio data using the Cloud Speech-to-Text API.
 *
 * @param {string|Buffer|import('stream').Readable} audioContent - The audio data bytes or stream to transcribe.
 */
async function streamingRecognize(audioContent) {
  try {
    const recognitionConfig = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    const streamingConfig = {
      config: recognitionConfig,
      interimResults: false,
    };

    await new Promise((resolve, reject) => {
      const recognizeStream = client
        .streamingRecognize(streamingConfig)
        .on('error', reject)
        .on('data', data => {
          if (data.results) {
            for (const result of data.results) {
              if (result.alternatives && result.alternatives[0]) {
                console.log(`Transcription: ${result.alternatives[0].transcript}`);
              }
            }
          }
        })
        .on('end', () => {
          console.log('Streaming recognition completed.');
          resolve();
        });

      if (typeof audioContent.pipe === 'function') {
        audioContent.pipe(recognizeStream);
      } else {
        const chunkSize = 4096;
        for (let i = 0; i < audioContent.length; i += chunkSize) {
          recognizeStream.write(audioContent.slice(i, i + chunkSize));
        }
        recognizeStream.end();
      }
    });
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided to Speech API:', err.message);
    } else if (err.code === status.UNAVAILABLE) {
      console.error('Speech API service is unavailable:', err.message);
    } else if (err.code) {
      console.error(`Speech API error [code ${err.code}]:`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { streamingRecognize };
// [END speech_v1p1beta1_speech_streaming_recognize]
