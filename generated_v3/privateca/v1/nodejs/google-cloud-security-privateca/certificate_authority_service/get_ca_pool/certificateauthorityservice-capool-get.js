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

// [START privateca_v1_certificateauthorityservice_capool_get]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Retrieves an existing CA pool.
 *
 * @param {string} projectId - The ID of the Google Cloud project.
 * @param {string} locationId - The Google Cloud region of the CA pool (for example, 'us-central1').
 * @param {string} caPoolId - The caller-specified ID of the CA pool to retrieve.
 */
async function getCaPool(projectId, locationId, caPoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/caPools/${caPoolId}`;
    const [caPool] = await client.getCaPool({name});

    console.log(`CA Pool name: ${caPool.name}`);
    console.log(`CA Pool tier: ${caPool.tier}`);
    return caPool;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`CA pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCaPool };
// [END privateca_v1_certificateauthorityservice_capool_get]
