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

// [START contactcenterinsights_v1_contactcenterinsights_encryptionspec_get]
'use strict';

const {ContactCenterInsightsClient} = require('@google-cloud/contact-center-insights');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves the Contact Center Insights encryption specification for a location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function getEncryptionSpec(projectId, locationId) {
  // Regional endpoints are required for customer-managed encryption keys (CMEK).
  const client = new ContactCenterInsightsClient({
    apiEndpoint: `${locationId}-contactcenterinsights.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/encryptionSpec`;
  const request = {
    name,
  };

  try {
    const [response] = await client.getEncryptionSpec(request);

    console.log(`Encryption specification: ${response.name}`);
    console.log(`KMS Key: ${response.kmsKey}`);
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Encryption specification not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getEncryptionSpec};
// [END contactcenterinsights_v1_contactcenterinsights_encryptionspec_get]
