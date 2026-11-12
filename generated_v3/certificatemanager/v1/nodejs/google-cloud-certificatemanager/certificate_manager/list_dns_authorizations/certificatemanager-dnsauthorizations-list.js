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

// [START certificatemanager_v1_certificatemanager_dnsauthorizations_list]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the listDnsAuthorizations method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listDnsAuthorizations(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const [dnsAuthorizations] = await client.listDnsAuthorizations({parent});

    for (const dnsAuthorization of dnsAuthorizations) {
      console.log(`DNS Authorization: ${dnsAuthorization.name}`);
      console.log(`Domain: ${dnsAuthorization.domain}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { listDnsAuthorizations };
// [END certificatemanager_v1_certificatemanager_dnsauthorizations_list]
