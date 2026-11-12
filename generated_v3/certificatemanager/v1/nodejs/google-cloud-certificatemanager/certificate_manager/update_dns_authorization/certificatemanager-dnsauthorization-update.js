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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_update]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the updateDnsAuthorization method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or a supported region).
 * @param {string} dnsAuthorizationId - The user-provided or existing identifier of the DNS authorization.
 */
async function updateDnsAuthorization(projectId, locationId, dnsAuthorizationId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const dnsAuthorization = {
      name: `projects/${projectId}/locations/${locationId}/dnsAuthorizations/${dnsAuthorizationId}`,
      description: 'Updated DNS Authorization description',
    };

    // Initiate the long-running operation to update the DNS authorization
    const [operation] = await client.updateDnsAuthorization({
      dnsAuthorization,
      updateMask,
    });

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Updated DNS authorization: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DNS authorization not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while updating DNS authorization: ${err.message}`);
    } else {
      console.error(`Failed to update DNS authorization: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateDnsAuthorization };
// [END certificatemanager_v1_certificatemanager_dnsauthorization_update]
