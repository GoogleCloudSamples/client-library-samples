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

// [START privateca_v1_certificateauthorityservice_capool_update]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Updates an existing CA pool's labels using the Certificate Authority Service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region where the CA pool is located (for example, 'us-central1').
 * @param {string} caPoolId - The ID of the CA pool to update.
 */
async function updateCaPool(projectId, locationId, caPoolId) {
  try {
    const caPool = {
      name: client.caPoolPath(projectId, locationId, caPoolId),
      labels: {
        env: 'test',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [operation] = await client.updateCaPool({
      caPool,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated CA pool: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CA pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateCaPool };
// [END privateca_v1_certificateauthorityservice_capool_update]
