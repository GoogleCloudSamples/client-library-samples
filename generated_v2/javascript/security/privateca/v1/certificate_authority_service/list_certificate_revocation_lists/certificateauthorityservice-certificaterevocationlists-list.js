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

// [START privateca_v1_certificateauthorityservice_certificaterevocationlists_list]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the listCertificateRevocationLists method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Certificate Authority.
 * @param {string} locationId - The Google Cloud region where the CA Pool and Certificate Authority reside (e.g., 'us-central1').
 * @param {string} caPoolId - The caller-specified identifier of the CA Pool (e.g., 'my-ca-pool'). Must match `[a-zA-Z0-9_-]{1,63}`.
 * @param {string} certificateAuthorityId - The caller-specified identifier of the Certificate Authority (e.g., 'my-ca'). Must match `[a-zA-Z0-9_-]{1,63}`.
 */
async function listCertificateRevocationLists(projectId, locationId, caPoolId, certificateAuthorityId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}/certificateAuthorities/${certificateAuthorityId}`;

    const [certificateRevocationLists] = await client.listCertificateRevocationLists({
      parent,
    });

    if (certificateRevocationLists.length === 0) {
      console.log('No Certificate Revocation Lists found.');
      return;
    }

    for (const crl of certificateRevocationLists) {
      console.log(`Certificate Revocation List: ${crl.name}`);
      console.log(`Sequence Number: ${crl.sequenceNumber}`);
      console.log(`State: ${crl.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list Certificate Revocation Lists: ${err.message}`);
    }
  }
}

module.exports = { listCertificateRevocationLists };
// [END privateca_v1_certificateauthorityservice_certificaterevocationlists_list]
