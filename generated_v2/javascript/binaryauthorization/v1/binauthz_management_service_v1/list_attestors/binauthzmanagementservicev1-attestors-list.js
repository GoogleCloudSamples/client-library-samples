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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestors_list]
'use strict';

const {BinauthzManagementServiceV1Client} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new BinauthzManagementServiceV1Client();

/**
 * Lists Binary Authorization attestors in a project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listAttestors(projectId) {
  try {
    const parent = client.projectPath(projectId);
    const request = {
      parent,
    };

    const [attestors] = await client.listAttestors(request);
    for (const attestor of attestors) {
      console.log(`Attestor name: ${attestor.name}`);
      console.log(`Description: ${attestor.description || 'None'}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${projectId}:`, err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for project ${projectId}:`, err.message);
    } else {
      console.error('Failed to list attestors:', err.message);
    }
  }
}

module.exports = { listAttestors };
// [END binaryauthorization_v1_binauthzmanagementservicev1_attestors_list]
