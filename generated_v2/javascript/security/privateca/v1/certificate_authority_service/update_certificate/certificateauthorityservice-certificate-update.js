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

// [START privateca_v1_certificateauthorityservice_certificate_update]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the updateCertificate method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the CA pool is located (for example, 'us-central1').
 * @param {string} caPoolId - The ID of the CA Pool.
 * @param {string} certificateId - The ID of the Certificate to update.
 */
async function updateCertificate(projectId, locationId, caPoolId, certificateId) {
  try {
    const certificate = {
      name: client.certificatePath(projectId, locationId, caPoolId, certificateId),
      labels: {
        env: 'test',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [response] = await client.updateCertificate({
      certificate,
      updateMask,
    });

    console.log(`Updated certificate: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error updating certificate: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateCertificate };
// [END privateca_v1_certificateauthorityservice_certificate_update]
