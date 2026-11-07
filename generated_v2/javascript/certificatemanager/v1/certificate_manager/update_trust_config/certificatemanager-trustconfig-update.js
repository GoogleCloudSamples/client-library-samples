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

// [START certificatemanager_v1_certificatemanager_trustconfig_update]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Updates an existing trust config resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location for the TrustConfig (for example, 'global' or 'us-central1').
 * @param {string} trustConfigId - The user-provided identifier of the TrustConfig. Must match regexp `[a-z0-9-]{1,63}`.
 */
async function updateTrustConfig(projectId, locationId, trustConfigId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const trustConfig = {
      name: `projects/${projectId}/locations/${locationId}/trustConfigs/${trustConfigId}`,
      description: 'Updated description for the trust configuration',
    };

    const [operation] = await client.updateTrustConfig({
      trustConfig,
      updateMask,
    });

    const [response] = await operation.promise();

    console.log(`Updated trust config: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Trust config not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Trust config conflict: ${err.message}`);
    } else {
      console.error(`API error updating trust config (code ${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTrustConfig };
// [END certificatemanager_v1_certificatemanager_trustconfig_update]
