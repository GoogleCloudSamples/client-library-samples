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

// [START privateca_v1_certificateauthorityservice_certificateauthority_get]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the getCertificateAuthority method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the certificate authority and CA pool are located, such as 'us-central1'.
 * @param {string} caPoolId - The caller-specified ID of the CA pool containing the certificate authority. Must match [a-zA-Z0-9_-]{1,63}.
 * @param {string} certificateAuthorityId - The caller-specified ID of the certificate authority to retrieve. Must match [a-zA-Z0-9_-]{1,63}.
 */
async function getCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const name = client.certificateAuthorityPath(
      projectId,
      locationId,
      caPoolId,
      certificateAuthorityId
    );

    const [certificateAuthority] = await client.getCertificateAuthority({
      name,
    });

    console.log(`Certificate Authority: ${certificateAuthority.name}`);
    console.log(`State: ${certificateAuthority.state}`);
    console.log(`Type: ${certificateAuthority.type}`);
    return certificateAuthority;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate authority not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing certificate authority: ${err.message}`);
    } else {
      console.error(`Failed to retrieve certificate authority: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_certificateauthority_get]
