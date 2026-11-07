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

// [START language_v1beta2_languageservice_classify_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Classifies text into categories using the Natural Language API.
 */
async function classifyText() {
  try {
    // Construct the document with plain text content exceeding twenty words.
    const document = {
      content:
        'Google Cloud Platform offers computing, storage, big data, machine learning, and software development services. Developers use these cloud tools to build, scale, and modernize web and enterprise applications reliably.',
      type: 'PLAIN_TEXT',
    };

    const request = {
      document,
    };

    const [response] = await client.classifyText(request);

    for (const category of response.categories) {
      console.log(`Category: ${category.name}, Confidence: ${category.confidence}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Language API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { classifyText };
// [END language_v1beta2_languageservice_classify_text]
