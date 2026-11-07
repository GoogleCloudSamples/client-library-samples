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

// [START certificatemanager_v1_certificatemanager_certificate_get]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Retrieves details of a specific certificate.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateId - ID of the Certificate (for example, 'example-certificate-id')
 */
async function getCertificate(projectId, locationId, certificateId) {
  try {
    const name = client.certificatePath(projectId, locationId, certificateId);

    const [certificate] = await client.getCertificate({
      name,
    });

    console.log(`Certificate name: ${certificate.name}`);
    console.log(`Description: ${certificate.description || 'N/A'}`);
    console.log(`SAN DNS names: ${certificate.sanDnsNames ? certificate.sanDnsNames.join(', ') : 'None'}`);
    return certificate;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate not found at: projects/${projectId}/locations/${locationId}/certificates/${certificateId}`);
    } else {
      console.error(`Error retrieving certificate: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCertificate };
// [END certificatemanager_v1_certificatemanager_certificate_get]
