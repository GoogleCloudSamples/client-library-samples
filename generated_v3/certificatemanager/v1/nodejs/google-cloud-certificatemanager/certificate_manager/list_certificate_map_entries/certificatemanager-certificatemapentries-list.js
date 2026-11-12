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

// [START certificatemanager_v1_certificatemanager_certificatemapentries_list]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the listCertificateMapEntries method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or 'global' where the certificate map is located.
 * @param {string} certificateMapId - The ID of the Certificate Map to list entries from (e.g., 'sample-map'). Must match regex '[a-z0-9-]{1,63}'.
 */
async function listCertificateMapEntries(projectId, locationId, certificateMapId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/certificateMaps/${certificateMapId}`;

    const [entries] = await client.listCertificateMapEntries({
      parent,
    });

    console.log(`Retrieved ${entries.length} certificate map entries.`);
    for (const entry of entries) {
      console.log(`Entry Name: ${entry.name}`);
      if (entry.hostname) {
        console.log(`  Hostname: ${entry.hostname}`);
      }
      if (entry.certificates && entry.certificates.length > 0) {
        console.log(`  Certificates: ${entry.certificates.join(', ')}`);
      }
      console.log(`  State: ${entry.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate map not found at resource path: ${projectId}/${locationId}/${certificateMapId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing certificate map entries for: ${projectId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else {
      console.error(`API request failed with error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listCertificateMapEntries };
// [END certificatemanager_v1_certificatemanager_certificatemapentries_list]
