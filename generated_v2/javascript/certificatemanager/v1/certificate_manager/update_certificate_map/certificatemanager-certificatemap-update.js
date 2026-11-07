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

// [START certificatemanager_v1_certificatemanager_certificatemap_update]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Updates an existing Certificate Map resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} certificateMapId - The ID of the CertificateMap to update. Must match '[a-z0-9-]{1,63}'.
 */
async function updateCertificateMap(projectId, locationId, certificateMapId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const certificateMap = {
      name: `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}`,
      description: 'Updated Certificate Map description',
    };

    const [operation] = await client.updateCertificateMap({
      certificateMap,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Certificate Map updated: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate Map not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateCertificateMap };
// [END certificatemanager_v1_certificatemanager_certificatemap_update]
