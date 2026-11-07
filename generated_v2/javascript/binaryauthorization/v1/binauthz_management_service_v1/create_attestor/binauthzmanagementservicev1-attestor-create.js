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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]
'use strict';

const {BinauthzManagementServiceV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new BinauthzManagementServiceV1Client();

/**
 * Creates an attestor.
 *
 * @param {string} attestorId - ID of the Attestor (for example, 'example-attestor-id')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createAttestor(attestorId, projectId) {
  try {
    const parent = `projects/${projectId}`;
    const attestor = {
      description: 'Attestor managed by Binary Authorization',
      userOwnedGrafeasNote: {
        noteReference: `projects/${projectId}/notes/${attestorId}`,
      },
    };

    const request = {
      parent,
      attestorId,
      attestor,
    };

    const [response] = await client.createAttestor(request);
    console.log(`Created attestor: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Attestor ${attestorId} already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { createAttestor };
// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]
