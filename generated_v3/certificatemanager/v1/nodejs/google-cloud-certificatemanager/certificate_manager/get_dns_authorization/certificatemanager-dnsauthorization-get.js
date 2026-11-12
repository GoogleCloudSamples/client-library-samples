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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_get]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the getDnsAuthorization method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} dnsAuthorizationId - ID of the DnsAuthorization (for example, 'example-dnsauthorization-id')
 */
async function getDnsAuthorization(projectId, locationId, dnsAuthorizationId) {
  try {
    const name = client.dnsAuthorizationPath(projectId, locationId, dnsAuthorizationId);

    const [dnsAuthorization] = await client.getDnsAuthorization({
      name,
    });

    console.log(`Retrieved DNS Authorization: ${dnsAuthorization.name}`);
    console.log(`Domain: ${dnsAuthorization.domain}`);
    if (dnsAuthorization.dnsResourceRecord) {
      console.log(`DNS Resource Record Name: ${dnsAuthorization.dnsResourceRecord.name}`);
      console.log(`DNS Resource Record Type: ${dnsAuthorization.dnsResourceRecord.type}`);
      console.log(`DNS Resource Record Data: ${dnsAuthorization.dnsResourceRecord.data}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DNS authorization resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing DNS authorization: ${err.message}`);
    } else {
      console.error(`RPC error obtaining DNS authorization: ${err.message}`);
    }
  }
}

module.exports = { getDnsAuthorization };
// [END certificatemanager_v1_certificatemanager_dnsauthorization_get]
