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

// [START texttospeech_v1beta1_texttospeech_synthesize_speech]
'use strict';

const {TextToSpeechClient} = require('@google-cloud/text-to-speech');
const {status} = require('@grpc/grpc-js');

const client = new TextToSpeechClient();

/**
 * Synthesizes speech from input text using specified voice and audio configurations.
 */
async function synthesizeSpeech() {
  try {
    const audioConfig = {
      audioEncoding: 'MP3',
    };
    const voice = {
      languageCode: 'en-US',
      ssmlGender: 'FEMALE',
    };
    const input = {
      text: 'Hello, world!',
    };

    const request = {
      input,
      voice,
      audioConfig,
    };

    const [response] = await client.synthesizeSpeech(request);
    console.log(`Synthesized audio content size: ${response.audioContent.length} bytes`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failure: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { synthesizeSpeech };
// [END texttospeech_v1beta1_texttospeech_synthesize_speech]
