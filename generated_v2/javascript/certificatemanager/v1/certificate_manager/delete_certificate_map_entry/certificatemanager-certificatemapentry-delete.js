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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_delete]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Deletes a certificate map entry.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'global')
 * @param {string} certificateMapId - ID of the certificate map (for example, 'example-certificatemap-id')
 * @param {string} certificateMapEntryId - ID of the certificate map entry (for example, 'example-certificatemapentry-id')
 */
async function deleteCertificateMapEntry(
  projectId,
  locationId,
  certificateMapId,
  certificateMapEntryId
) {
  if (!projectId) {
    try {
      projectId = await client.getProjectId();
    } catch {
      projectId = process.env.GOOGLE_CLOUD_PROJECT;
    }
  }

  try {
    const name = client.certificateMapEntryPath(
      projectId,
      locationId,
      certificateMapId,
      certificateMapEntryId
    );

    const [operation] = await client.deleteCertificateMapEntry({name});
    await operation.promise();

    console.log(`Deleted certificate map entry: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate map entry not found: ${err.message}`);
    } else {
      console.error(`Failed to delete certificate map entry: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteCertificateMapEntry };
// [END certificatemanager_v1_certificatemanager_certificatemapentry_delete]
