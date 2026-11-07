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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_update]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Updates a certificate map entry.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} certificateMapId - The caller-chosen ID of the existing certificate map.
 * @param {string} certificateMapEntryId - The caller-chosen ID of the certificate map entry to update.
 */
async function updateCertificateMapEntry(projectId, locationId, certificateMapId, certificateMapEntryId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const certificateMapEntry = {
      name: `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}/certificateMapEntries/${certificateMapEntryId}`,
      description: 'Updated certificate map entry description',
    };

    const [operation] = await client.updateCertificateMapEntry({
      certificateMapEntry,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated certificate map entry: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { updateCertificateMapEntry };
// [END certificatemanager_v1_certificatemanager_certificatemapentry_update]
