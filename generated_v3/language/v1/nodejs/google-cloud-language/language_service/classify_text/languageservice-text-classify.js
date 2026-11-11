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

// [START language_v1_languageservice_classify_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Classifies input text into content categories using the Language service.
 */
async function classifyText() {
  try {
    // Content must contain at least 20 words for text classification.
    const document = {
      content:
        'Google Cloud provides scalable computing services, container management with Kubernetes, and enterprise data analytics tools designed for high performance and reliability across global infrastructure.',
      type: 'PLAIN_TEXT',
    };

    const [classification] = await client.classifyText({document});

    for (const category of classification.categories) {
      console.log(`Category: ${category.name}`);
      console.log(`Confidence: ${category.confidence}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided to the Language service:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when calling the Language service:', err.message);
    } else if (typeof err.code === 'number') {
      console.error(`Google API RPC error (code ${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { classifyText };
// [END language_v1_languageservice_classify_text]
