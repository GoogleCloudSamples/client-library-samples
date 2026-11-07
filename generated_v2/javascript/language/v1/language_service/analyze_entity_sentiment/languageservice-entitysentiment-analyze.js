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

// [START language_v1_languageservice_analyze_entity_sentiment]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes entity sentiment in the provided document.
 */
async function analyzeEntitySentiment() {
  try {
    const document = {
      content: 'Google, headquartered in Mountain View, unveiled the new phone.',
      type: 'PLAIN_TEXT',
    };

    const [response] = await client.analyzeEntitySentiment({document});

    console.log(`Document language: ${response.language}`);
    for (const entity of response.entities) {
      console.log(`Entity: ${entity.name}`);
      console.log(`Type: ${entity.type}`);
      console.log(`Score: ${entity.sentiment.score}`);
      console.log(`Magnitude: ${entity.sentiment.magnitude}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid document argument:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failure:', err.message);
    } else {
      console.error('Failed to analyze entity sentiment:', err);
    }
  }
}

module.exports = { analyzeEntitySentiment };
// [END language_v1_languageservice_analyze_entity_sentiment]
