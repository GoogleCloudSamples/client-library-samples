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

// [START certificatemanager_v1_certificatemanager_certificatemap_get]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the getCertificateMap method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateMapId - The caller-specified identifier of the CertificateMap to retrieve (for example, 'example-cert-map'). Must match regex [a-z0-9-]{1,63}.
 */
async function getCertificateMap(projectId, locationId, certificateMapId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}`;

    const [certificateMap] = await client.getCertificateMap({name});

    console.log(`Retrieved certificate map: ${certificateMap.name}`);
    console.log(`Description: ${certificateMap.description}`);
    return certificateMap;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate map not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing certificate map: ${err.message}`);
    } else {
      console.error(`API error retrieving certificate map: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCertificateMap };
// [END certificatemanager_v1_certificatemanager_certificatemap_get]
