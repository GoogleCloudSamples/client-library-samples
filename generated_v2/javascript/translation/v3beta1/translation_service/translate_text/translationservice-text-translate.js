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

// [START translate_v3beta1_translationservice_translate_text]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Translates input text using the Translation API.
 *
 * @param {string} projectNumberOrId - ID of the project (for example, 'example-project-id')
 */
async function translateText(projectNumberOrId) {
  try {
    const contents = 'Hello, world!';
    const parent = `projects/${projectNumberOrId}`;
    const targetLanguageCode = 'es';

    const request = {
      parent,
      contents: [contents],
      targetLanguageCode,
    };

    const [response] = await client.translateText(request);

    for (const translation of response.translations) {
      console.log(`Translated text: ${translation.translatedText}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Translation service error: ${err.message}`);
    }
  }
}

module.exports = { translateText };
// [END translate_v3beta1_translationservice_translate_text]
