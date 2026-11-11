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

// [START language_v1beta2_languageservice_analyze_entities]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes entities within text using the LanguageService.
 */
async function analyzeEntities() {
  try {
    const document = {
      content:
        'Google, headquartered in Mountain View, was founded by Larry Page and Sergey Brin.',
      type: 'PLAIN_TEXT',
    };
    const encodingType = 'UTF8';

    const request = {
      document,
      encodingType,
    };

    const [response] = await client.analyzeEntities(request);

    console.log(`Detected language: ${response.language}`);
    console.log('Entities found:');
    for (const entity of response.entities) {
      console.log(`- Name: ${entity.name}`);
      console.log(`  Type: ${entity.type}`);
      console.log(`  Salience: ${entity.salience}`);
      if (entity.metadata && Object.keys(entity.metadata).length > 0) {
        console.log(`  Metadata: ${JSON.stringify(entity.metadata)}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { analyzeEntities };
// [END language_v1beta2_languageservice_analyze_entities]
