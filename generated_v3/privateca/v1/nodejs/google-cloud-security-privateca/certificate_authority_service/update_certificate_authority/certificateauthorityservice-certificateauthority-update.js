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

// [START privateca_v1_certificateauthorityservice_certificateauthority_update]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Updates labels for an existing Certificate Authority.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The GCP region or location of the Certificate Authority (for example, 'us-central1').
 * @param {string} caPoolId - The ID of the CA Pool containing the Certificate Authority.
 * @param {string} certificateAuthorityId - The ID of the Certificate Authority to update.
 */
async function updateCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const certificateAuthority = {
      name: `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}/certificateAuthorities/${certificateAuthorityId}`,
      labels: {
        env: 'test',
      },
    };

    const updateMask = {
      paths: ['labels'],
    };

    // UpdateCertificateAuthority is a long-running operation.
    const [operation] = await client.updateCertificateAuthority({
      certificateAuthority,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated Certificate Authority: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate Authority not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`RPC failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_certificateauthority_update]
