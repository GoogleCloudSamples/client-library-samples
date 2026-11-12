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

// [START certificatemanager_v1_certificatemanager_trustconfig_delete]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the deleteTrustConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the TrustConfig (for example, 'global' or 'us-central1').
 * @param {string} trustConfigId - The user-defined identifier of the TrustConfig to delete (for example, 'sample-trust-config').
 */
async function deleteTrustConfig(projectId, locationId, trustConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/trustConfigs/${trustConfigId}`;

    const [operation] = await client.deleteTrustConfig({name});
    await operation.promise();

    console.log(`Deleted TrustConfig: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TrustConfig not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Error deleting TrustConfig: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTrustConfig };
// [END certificatemanager_v1_certificatemanager_trustconfig_delete]
