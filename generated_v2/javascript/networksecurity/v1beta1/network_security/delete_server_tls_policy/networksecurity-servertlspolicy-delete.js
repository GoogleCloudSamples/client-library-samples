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

// [START networksecurity_v1beta1_networksecurity_servertlspolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Deletes a ServerTlsPolicy resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (region or 'global') where the ServerTlsPolicy is located (for example, 'us-central1' or 'global').
 * @param {string} serverTlsPolicyId - The ID of the ServerTlsPolicy to delete (for example, 'example-server-tls-policy').
 */
async function deleteServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`;

    // DeleteServerTlsPolicy initiates a long-running operation.
    const [operation] = await client.deleteServerTlsPolicy({name});

    // Wait for the long-running operation to complete.
    await operation.promise();

    console.log(`Deleted ServerTlsPolicy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Server TLS policy is currently in use: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { deleteServerTlsPolicy };
// [END networksecurity_v1beta1_networksecurity_servertlspolicy_delete]
