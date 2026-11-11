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

// [START language_v2_languageservice_annotate_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Annotates text using the LanguageService client.
 */
async function annotateText() {
  try {
    const document = {
      content: 'Google Cloud Natural Language API provides natural language understanding technologies.',
      type: 'PLAIN_TEXT',
    };

    const features = {
      extractEntities: true,
      extractDocumentSentiment: true,
    };

    const encodingType = 'UTF8';

    const [response] = await client.annotateText({
      document,
      features,
      encodingType,
    });

    console.log(`Detected language: ${response.languageCode || response.language}`);
    if (response.documentSentiment) {
      console.log(`Document sentiment score: ${response.documentSentiment.score}`);
      console.log(`Document sentiment magnitude: ${response.documentSentiment.magnitude}`);
    }
    if (response.entities) {
      console.log(`Entities found: ${response.entities.length}`);
      for (const entity of response.entities) {
        console.log(` - ${entity.name} (${entity.type})`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { annotateText };
// [END language_v2_languageservice_annotate_text]
