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

// [START texttospeech_v1_texttospeech_voices_list]
'use strict';

const {TextToSpeechClient} = require('@google-cloud/text-to-speech');
const {status} = require('@grpc/grpc-js');

const client = new TextToSpeechClient();

/**
 * Use the listVoices method
 *
 * @param {string} languageCode - Optional BCP-47 language tag (e.g., 'en-US') to filter voices. If not specified or left empty, all supported voices are returned.
 */
async function listVoices(languageCode) {
  try {
    const request = {};
    if (languageCode) {
      request.languageCode = languageCode;
    }

    const [response] = await client.listVoices(request);
    const voices = response.voices || [];

    for (const voice of voices) {
      console.log(`Name: ${voice.name}`);
      console.log(`SSML Voice Gender: ${voice.ssmlGender}`);
      console.log(`Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
      console.log(`Supported Language Codes: ${voice.languageCodes.join(', ')}`);
    }

    return voices;
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { listVoices };
// [END texttospeech_v1_texttospeech_voices_list]
