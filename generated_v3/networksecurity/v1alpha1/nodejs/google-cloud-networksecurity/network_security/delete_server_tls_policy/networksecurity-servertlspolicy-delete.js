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

// [START networksecurity_v1alpha1_networksecurity_servertlspolicy_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Use the deleteServerTlsPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID where the ServerTlsPolicy is located.
 * @param {string} locationId - The Google Cloud location where the ServerTlsPolicy is located (for example, 'global' or 'us-central1').
 * @param {string} serverTlsPolicyId - The client-specified identifier of the ServerTlsPolicy to delete (for example, 'server-mtls-policy'). Must be 1-63 characters, matching [a-zA-Z0-9_-]+ and not starting with a number.
 */
async function deleteServerTlsPolicy(projectId, locationId, serverTlsPolicyId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serverTlsPolicies/${serverTlsPolicyId}`;

    const [operation] = await client.deleteServerTlsPolicy({name});
    await operation.promise();

    console.log(`Deleted Server TLS policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server TLS policy not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Policy deletion rejected due to active references: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteServerTlsPolicy };
// [END networksecurity_v1alpha1_networksecurity_servertlspolicy_delete]
