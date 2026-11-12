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

// [START certificatemanager_v1_certificatemanager_certificate_delete]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the deleteCertificate method.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (region or 'global') where the certificate is located (for example, 'global' or 'us-central1').
 * @param {string} certificateId - The identifier of the Certificate to delete, matching regex `[a-z0-9-]{1,63}` (for example, 'example-certificate-id').
 */
async function deleteCertificate(projectId, locationId, certificateId) {
  try {
    const name = client.certificatePath(projectId, locationId, certificateId);

    // DeleteCertificate is a long-running operation; wait for operation completion.
    const [operation] = await client.deleteCertificate({name});
    await operation.promise();

    console.log(`Deleted certificate: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Certificate deletion failed precondition: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteCertificate };
// [END certificatemanager_v1_certificatemanager_certificate_delete]
