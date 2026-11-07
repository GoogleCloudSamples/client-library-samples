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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_update]
'use strict';

const {BinauthzManagementServiceV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new BinauthzManagementServiceV1Client();

/**
 * Updates an existing attestor's description.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} attestorId - The caller-chosen identifier of the existing attestor to update (for example, 'example-attestor-id').
 */
async function updateAttestor(projectId, attestorId) {
  try {
    const attestorName = client.attestorPath(projectId, attestorId);

    // Retrieve the existing attestor to preserve required configuration fields during full replacement
    const [retrievedAttestor] = await client.getAttestor({
      name: attestorName,
    });

    const attestor = retrievedAttestor;
    attestor.description = 'Updated description for verified container deployments';

    const [updatedAttestor] = await client.updateAttestor({
      attestor,
    });

    console.log(`Updated attestor: ${updatedAttestor.name}`);
    console.log(`Description: ${updatedAttestor.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Attestor not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateAttestor };
// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_update]
