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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_create]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.BinauthzManagementServiceV1Beta1Client();

/**
 * Creates an attestor in Binary Authorization.
 *
 * @param {string} attestorId - ID of the Attestor (for example, 'example-attestor-id')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createAttestor(attestorId, projectId) {
  try {
    const parent = `projects/${projectId}`;
    const attestor = {
      name: `projects/${projectId}/attestors/${attestorId}`,
      userOwnedDrydockNote: {
        noteReference: `projects/${projectId}/notes/example-note`,
      },
    };

    const request = {
      parent,
      attestorId,
      attestor,
    };

    const [response] = await client.createAttestor(request);
    console.log(`Created attestor: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Attestor already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = {createAttestor};
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_create]
