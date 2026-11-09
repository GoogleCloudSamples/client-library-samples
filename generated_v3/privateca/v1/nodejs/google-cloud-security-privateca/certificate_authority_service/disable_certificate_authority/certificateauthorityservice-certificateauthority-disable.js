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

// [START privateca_v1_certificateauthorityservice_disable_certificate_authority]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the disableCertificateAuthority method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - The caller-chosen identifier of the CA Pool (for example, 'example-ca-pool-id').
 * @param {string} certificateAuthorityId - The caller-chosen identifier of the Certificate Authority to disable (for example, 'example-certificate-authority-id'). The Certificate Authority must already exist and be in the ENABLED state.
 */
async function disableCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}/certificateAuthorities/${certificateAuthorityId}`;

    const [operation] = await client.disableCertificateAuthority({name});
    const [response] = await operation.promise();

    console.log(`Disabled Certificate Authority: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate Authority not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation invalid for current state: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Service returned error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { disableCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_disable_certificate_authority]
