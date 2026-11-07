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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_create]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the createCertificateMapEntry method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateMapId - ID of the CertificateMap (for example, 'example-certificatemap-id')
 * @param {string} certificateMapEntryId - ID of the CertificateMapEntry (for example, 'example-certificatemapentry-id')
 * @param {string} certificateId - The ID of the Certificate to associate with the certificate map entry (for example, 'example-certificate-id').
 */
async function createCertificateMapEntry(projectId, locationId, certificateMapId, certificateMapEntryId, certificateId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}`;
    const certificateMapEntry = {
      hostname: 'test.example.com',
      certificates: [
        `projects/${projectId}/locations/${locationId}/certificates/${certificateId}`,
      ],
    };

    const request = {
      parent,
      certificateMapEntryId,
      certificateMapEntry,
    };

    const [operation] = await client.createCertificateMapEntry(request);
    const [response] = await operation.promise();

    console.log(`Created certificate map entry: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate map entry already exists: ${err.message}`);
    } else {
      console.error(`Error creating certificate map entry: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createCertificateMapEntry };
// [END certificatemanager_v1_certificatemanager_certificatemapentry_create]
