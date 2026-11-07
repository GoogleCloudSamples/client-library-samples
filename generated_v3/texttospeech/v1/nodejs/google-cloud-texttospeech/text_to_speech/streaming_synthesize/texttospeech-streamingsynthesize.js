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

// [START texttospeech_v1_texttospeech_streaming_synthesize]
'use strict';

const {TextToSpeechClient} = require('@google-cloud/text-to-speech');
const {status} = require('@grpc/grpc-js');

const client = new TextToSpeechClient();

/**
 * Synthesizes speech from text using bidirectional streaming.
 */
async function streamingSynthesize() {
  try {
    await new Promise((resolve, reject) => {
      let hasError = false;
      const stream = client.streamingSynthesize();

      stream.on('data', response => {
        if (response.audioContent) {
          console.log(`Received audio chunk size: ${response.audioContent.length} bytes`);
        }
      });

      stream.on('error', err => {
        hasError = true;
        reject(err);
      });

      stream.on('end', () => {
        if (!hasError) {
          console.log('Streaming synthesis completed successfully.');
          resolve();
        }
      });

      // Configure synthesis voice and audio encoding parameters.
      const voice = {
        languageCode: 'en-US',
        name: 'en-US-Journey-F',
      };
      const streamingAudioConfig = {
        audioEncoding: 'OGG_OPUS',
      };
      const streamingConfig = {
        voice,
        streamingAudioConfig,
      };

      // Send initial configuration frame.
      stream.write({streamingConfig});

      // Send text input content to synthesize.
      const input = {
        text: 'Streaming text-to-speech delivers real-time audio playback.',
      };
      stream.write({input});

      // Terminate input stream to signal synthesis completion.
      stream.end();
    });
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument supplied:', err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failed:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API error status ${err.code}:`, err.message);
    } else {
      console.error('Unexpected error occurred:', err.message);
    }
  }
}

module.exports = { streamingSynthesize };
// [END texttospeech_v1_texttospeech_streaming_synthesize]
