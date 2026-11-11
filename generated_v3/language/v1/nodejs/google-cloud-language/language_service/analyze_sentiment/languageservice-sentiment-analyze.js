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

// [START language_v1_languageservice_analyze_sentiment]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes the sentiment of a provided text document.
 */
async function analyzeSentiment() {
  try {
    const document = {
      content:
        'Google Cloud Natural Language API provides powerful natural language understanding technologies.',
      type: 'PLAIN_TEXT',
      language: 'en',
    };
    const encodingType = 'UTF8';

    const [response] = await client.analyzeSentiment({
      document,
      encodingType,
    });

    console.log(`Document sentiment score: ${response.documentSentiment.score}`);
    console.log(
      `Document sentiment magnitude: ${response.documentSentiment.magnitude}`
    );

    for (const sentence of response.sentences) {
      console.log(`Sentence: ${sentence.text.content}`);
      console.log(`Score: ${sentence.sentiment.score}`);
      console.log(`Magnitude: ${sentence.sentiment.magnitude}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument supplied:', err.message);
    } else {
      console.error('API request failed:', err.message);
    }
  }
}

module.exports = { analyzeSentiment };
// [END language_v1_languageservice_analyze_sentiment]
