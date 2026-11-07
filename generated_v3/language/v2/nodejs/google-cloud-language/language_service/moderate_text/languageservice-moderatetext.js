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

// [START language_v2_languageservice_moderate_text]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes text content and detects sensitive or harmful categories.
 */
async function moderateText() {
  try {
    const document = {
      content: 'I hate this product and service!',
      type: 'PLAIN_TEXT',
    };

    const [response] = await client.moderateText({document});

    console.log('Moderation categories:');
    for (const category of response.moderationCategories) {
      console.log(`Category: ${category.name}, Confidence: ${category.confidence}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error moderating text: ${err.message}`);
    }
  }
}

module.exports = { moderateText };
// [END language_v2_languageservice_moderate_text]
