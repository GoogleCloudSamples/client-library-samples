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

// [START certificatemanager_v1_certificatemanager_certificate_update]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the updateCertificate method
 *
 * @param {string} projectId - The ID of the Google Cloud project hosting the certificate.
 * @param {string} locationId - The Google Cloud location for the certificate, such as 'global' or a supported region.
 * @param {string} certificateId - The user-defined identifier of the certificate to update. Must match regex [a-z0-9-]{1,63}.
 */
async function updateCertificate(projectId, locationId, certificateId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const certificate = {
      name: `projects/${projectId}/locations/${locationId}/certificates/${certificateId}`,
      description: 'Updated certificate description',
    };

    const [operation] = await client.updateCertificate({
      certificate,
      updateMask,
    });

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Updated certificate: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateCertificate };
// [END certificatemanager_v1_certificatemanager_certificate_update]
