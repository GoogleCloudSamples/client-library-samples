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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_get]
'use strict';

const {BinauthzManagementServiceV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new BinauthzManagementServiceV1Client();

/**
 * Retrieves details of a Binary Authorization attestor.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} attestorId - ID of the Attestor (for example, 'example-attestor-id')
 */
async function getAttestor(projectId, attestorId) {
  try {
    const name = client.attestorPath(projectId, attestorId);
    const request = {
      name: name,
    };

    const [attestor] = await client.getAttestor(request);

    console.log(`Retrieved attestor: ${attestor.name}`);
    if (attestor.description) {
      console.log(`Description: ${attestor.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Attestor not found in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when retrieving attestor ${attestorId}.`);
    } else {
      console.error('Error retrieving attestor:', err);
    }
  }
}

module.exports = { getAttestor };
// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_get]
