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

// [START language_v2_languageservice_analyze_entities]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes named entities in a text document.
 */
async function analyzeEntities() {
  try {
    const document = {
      content: 'Google, headquartered in Mountain View, unveiled new features.',
      type: 'PLAIN_TEXT',
    };
    const encodingType = 'UTF8';

    const [response] = await client.analyzeEntities({
      document,
      encodingType,
    });

    for (const entity of response.entities) {
      console.log(`Entity: ${entity.name}`);
      console.log(`Type: ${entity.type}`);
      console.log(`Salience: ${entity.salience}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { analyzeEntities };
// [END language_v2_languageservice_analyze_entities]
