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

// [START translate_v3_translationservice_translate_text]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Use the translateText method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) for the translation request (for example, 'global' or 'us-central1').
 */
async function translateText(projectId, locationId) {
  try {
    const targetLanguageCode = 'es';
    const parent = `projects/${projectId}/locations/${locationId}`;
    const contents = ['Hello, world!'];

    const request = {
      parent,
      contents,
      targetLanguageCode,
    };

    const [response] = await client.translateText(request);

    for (const translation of response.translations) {
      console.log(`Translated text: ${translation.translatedText}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Translation request failed: ${err.message}`);
    }
  }
}

module.exports = { translateText };
// [END translate_v3_translationservice_translate_text]
