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

// [START privateca_v1_certificateauthorityservice_undelete_certificate_authority]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the undeleteCertificateAuthority method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - ID of the CaPool (for example, 'example-capool-id')
 * @param {string} certificateAuthorityId - ID of the CertificateAuthority (for example, 'example-certificateauthority-id')
 */
async function undeleteCertificateAuthority(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}/certificateAuthorities/${certificateAuthorityId}`;

    const request = {
      name,
    };

    const [operation] = await client.undeleteCertificateAuthority(request);
    const [response] = await operation.promise();

    console.log(`Undeleted Certificate Authority: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate Authority not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition check failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { undeleteCertificateAuthority };
// [END privateca_v1_certificateauthorityservice_undelete_certificate_authority]
