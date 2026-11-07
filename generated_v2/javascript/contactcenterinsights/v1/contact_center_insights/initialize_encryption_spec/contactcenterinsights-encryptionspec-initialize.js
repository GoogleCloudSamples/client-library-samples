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

// [START contactcenterinsights_v1_contactcenterinsights_initialize_encryption_spec]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

const client = new ContactCenterInsightsClient();

/**
 * Initializes the encryption specification for Contact Center Insights.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function initializeEncryptionSpec(projectId, locationId) {
  try {
    const encryptionSpec = {
      name: `projects/${projectId}/locations/${locationId}/encryptionSpec`,
      kmsKey: `projects/${projectId}/locations/${locationId}/keyRings/example-key-ring/cryptoKeys/example-crypto-key`,
    };

    const request = {
      encryptionSpec,
    };

    // Initialize the encryption specification and wait for the long-running operation to complete.
    const [operation] = await client.initializeEncryptionSpec(request);
    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Encryption specification initialized successfully.');
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error('Encryption specification is already initialized:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to initialize encryption specification:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { initializeEncryptionSpec };
// [END contactcenterinsights_v1_contactcenterinsights_initialize_encryption_spec]
