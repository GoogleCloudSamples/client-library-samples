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

// [START certificatemanager_v1_certificatemanager_certificatemap_delete]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the deleteCertificateMap method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateMapId - The ID of the Certificate Map to delete (for example, 'example-certificate-map'). Must match regex [a-z0-9-]{1,63}.
 */
async function deleteCertificateMap(projectId, locationId, certificateMapId) {
  try {
    const name = client.certificateMapPath(
      projectId,
      locationId,
      certificateMapId
    );

    // DeleteCertificateMap initiates a long-running operation.
    const [operation] = await client.deleteCertificateMap({name});
    await operation.promise();

    console.log(`Deleted certificate map: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate map not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteCertificateMap };
// [END certificatemanager_v1_certificatemanager_certificatemap_delete]
