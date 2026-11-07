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

// [START dlp_v2_dlpservice_deidentify_content]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the deidentifyContent method
 *
 * @param {string} projectId - The Google Cloud project ID to run the de-identification request under.
 */
async function deidentifyContent(projectId) {
  try {
    // Construct the parent resource path
    const parent = `projects/${projectId}`;

    // Define transformation rules to replace sensitive info types
    const transformation = {
      infoTypes: [{name: 'PHONE_NUMBER'}, {name: 'EMAIL_ADDRESS'}],
      primitiveTransformation: {
        replaceConfig: {
          newValue: {stringValue: '[REDACTED]'},
        },
      },
    };

    const deidentifyConfig = {
      infoTypeTransformations: {
        transformations: [transformation],
      },
    };

    const item = {
      value: 'Contact email is employee@example.com and phone is 206-555-0123.',
    };

    const request = {
      parent,
      deidentifyConfig,
      item,
    };

    const [response] = await client.deidentifyContent(request);
    console.log(`De-identified text: ${response.item.value}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT || err.code === status.PERMISSION_DENIED) {
      console.error(`Google API request error: ${err.message}`);
      return;
    }
    if (err.code !== undefined) {
      console.error(`DLP API error (${err.code}): ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { deidentifyContent };
// [END dlp_v2_dlpservice_deidentify_content]
