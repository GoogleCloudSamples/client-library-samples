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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.BinauthzManagementServiceV1Beta1Client();

/**
 * Deletes an attestor from Binary Authorization.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} attestorId - ID of the Attestor (for example, 'example-attestor-id')
 */
async function deleteAttestor(projectId, attestorId) {
  const name = client.attestorPath(projectId, attestorId);

  try {
    const request = {
      name,
    };

    await client.deleteAttestor(request);
    console.log(`Deleted attestor: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Attestor not found: ${name}`);
      return;
    }
    console.error(`Failed to delete attestor: ${err.message}`);
  }
}

module.exports = {deleteAttestor};
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_delete]
