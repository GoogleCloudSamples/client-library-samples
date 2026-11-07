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

// [START language_v1_languageservice_annotate_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Use the annotateText method
 */
async function annotateText() {
  try {
    const document = {
      type: 'PLAIN_TEXT',
      content: 'Google, headquartered in Mountain View, unveiled new Gemini AI updates with positive community reception.',
    };
    const features = {
      extractSyntax: true,
      extractEntities: true,
      extractDocumentSentiment: true,
    };
    const encodingType = 'UTF8';

    const request = {
      document,
      features,
      encodingType,
    };

    const [response] = await client.annotateText(request);

    console.log(`Detected language: ${response.language}`);
    console.log(`Sentiment score: ${response.documentSentiment.score}`);
    console.log(`Sentiment magnitude: ${response.documentSentiment.magnitude}`);
    console.log(`Entity count: ${response.entities.length}`);
    console.log(`Sentence count: ${response.sentences.length}`);
    console.log(`Token count: ${response.tokens.length}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication error: ${err.message}`);
    } else {
      console.error(`API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { annotateText };
// [END language_v1_languageservice_annotate_text]
