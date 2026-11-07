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

// [START language_v2_languageservice_classify_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Classifies text content into categories using the Language service.
 */
async function classifyText() {
  try {
    const document = {
      content:
        'Google Cloud Platform provides scalable cloud computing, data analytics, machine learning, and secure infrastructure services that help developers deploy applications globally with high availability and automated management.',
      type: 'PLAIN_TEXT',
    };

    const [response] = await client.classifyText({document});

    if (response.categories && response.categories.length > 0) {
      console.log('Categories:');
      for (const category of response.categories) {
        console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
      }
    } else {
      console.log('No categories detected.');
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument error: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied error: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { classifyText };
// [END language_v2_languageservice_classify_text]
