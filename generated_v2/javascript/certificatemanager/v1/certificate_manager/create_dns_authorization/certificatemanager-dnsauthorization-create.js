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

// [START certificatemanager_v1_certificatemanager_dnsauthorization_create]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the createDnsAuthorization method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} dnsAuthorizationId - ID of the DnsAuthorization (for example, 'example-dnsauthorization-id')
 */
async function createDnsAuthorization(projectId, locationId, dnsAuthorizationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const dnsAuthorization = {
      domain: 'subdomain.example.com',
      description: 'DNS authorization for domain verification',
    };

    const [operation] = await client.createDnsAuthorization({
      parent,
      dnsAuthorizationId,
      dnsAuthorization,
    });
    const [response] = await operation.promise();

    console.log(`Created DNS authorization: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`DNS authorization ${dnsAuthorizationId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating DNS authorization: ${err.message}`);
    } else {
      console.error(`Failed to create DNS authorization: ${err.message}`);
    }
  }
}

module.exports = { createDnsAuthorization };
// [END certificatemanager_v1_certificatemanager_dnsauthorization_create]
