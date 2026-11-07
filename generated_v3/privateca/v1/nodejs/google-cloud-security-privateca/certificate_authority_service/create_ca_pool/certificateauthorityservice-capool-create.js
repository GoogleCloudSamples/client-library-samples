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

// [START privateca_v1_certificateauthorityservice_capool_create]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the createCaPool method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} caPoolId - ID of the CaPool (for example, 'example-capool-id')
 */
async function createCaPool(projectId, locationId, caPoolId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const caPool = {
      tier: 'DEVOPS',
    };

    const request = {
      parent,
      caPoolId,
      caPool,
    };

    const [operation] = await client.createCaPool(request);
    const [response] = await operation.promise();
    console.log(`Created CA Pool: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`CA Pool already exists: ${caPoolId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for CA Pool creation: ${err.message}`);
    } else {
      console.error(`Failed to create CA Pool: ${err.message}`);
    }
  }
}

module.exports = { createCaPool };
// [END privateca_v1_certificateauthorityservice_capool_create]
