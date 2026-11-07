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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_get]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the getCertificateMapEntry method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateMapId - ID of the CertificateMap (for example, 'example-certificatemap-id')
 * @param {string} certificateMapEntryId - ID of the CertificateMapEntry (for example, 'example-certificatemapentry-id')
 */
async function getCertificateMapEntry(projectId, locationId, certificateMapId, certificateMapEntryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}/certificateMapEntries/${certificateMapEntryId}`;

    const [response] = await client.getCertificateMapEntry({
      name,
    });

    console.log(`Certificate Map Entry name: ${response.name}`);
    console.log(`Hostname: ${response.hostname}`);
    console.log(`State: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate map entry not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCertificateMapEntry };
// [END certificatemanager_v1_certificatemanager_certificatemapentry_get]
