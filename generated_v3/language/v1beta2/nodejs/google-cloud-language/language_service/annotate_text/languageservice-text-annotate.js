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

// [START language_v1beta2_languageservice_annotate_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Use the annotateText method
 */
async function annotateText() {
  try {
    // Configure analysis features to extract syntax, entities, and sentiment
    const features = {
      extractSyntax: true,
      extractEntities: true,
      extractDocumentSentiment: true,
    };

    // Define plain text content for inline analysis
    const document = {
      content:
        'Google Cloud Natural Language API provides natural language understanding technologies to developers.',
      type: 'PLAIN_TEXT',
    };

    // Specify UTF-8 encoding for calculating token and mention offsets
    const encodingType = 'UTF8';

    const [response] = await client.annotateText({
      document,
      features,
      encodingType,
    });

    console.log(`Detected language: ${response.language}`);
    console.log(`Sentiment score: ${response.documentSentiment?.score}`);
    console.log(`Sentiment magnitude: ${response.documentSentiment?.magnitude}`);
    console.log(`Entities found: ${response.entities?.length ?? 0}`);
    console.log(`Tokens found: ${response.tokens?.length ?? 0}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { annotateText };
// [END language_v1beta2_languageservice_annotate_text]
