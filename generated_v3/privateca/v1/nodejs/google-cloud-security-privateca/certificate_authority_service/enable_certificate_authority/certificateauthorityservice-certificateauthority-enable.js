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

// [START privateca_v1_certificateauthorityservice_enable_certificate_authority]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Enables a disabled Certificate Authority.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the CA pool and certificate authority reside (for example, 'us-central1').
 * @param {string} caPoolId - The caller-specified ID of the CaPool containing the target CertificateAuthority (for example, 'example-capool-id').
 * @param {string} certificateAuthorityId - The caller-specified ID of the CertificateAuthority to enable (for example, 'example-certificateauthority-id').
 */
async function enableCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}/certificateAuthorities/${certificateAuthorityId}`;

    const request = {
      name,
    };

    const [operation] = await client.enableCertificateAuthority(request);
    const [response] = await operation.promise();

    console.log(`Enabled Certificate Authority: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate Authority not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Certificate Authority state precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to enable Certificate Authority: ${err.message}`);
    }
  }
}

module.exports = { enableCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_enable_certificate_authority]
