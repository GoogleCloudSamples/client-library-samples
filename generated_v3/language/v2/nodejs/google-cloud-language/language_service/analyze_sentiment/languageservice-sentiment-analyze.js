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

// [START language_v2_languageservice_analyze_sentiment]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes the sentiment of the provided text document using the Natural Language API.
 */
async function analyzeSentiment() {
  try {
    const document = {
      content: 'Google Cloud Natural Language API provides powerful sentiment analysis.',
      type: 'PLAIN_TEXT',
    };

    const [response] = await client.analyzeSentiment({document});

    console.log(`Document sentiment score: ${response.documentSentiment.score}`);
    console.log(`Document sentiment magnitude: ${response.documentSentiment.magnitude}`);
    console.log(`Language: ${response.languageCode}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication error: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Service error with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { analyzeSentiment };
// [END language_v2_languageservice_analyze_sentiment]
