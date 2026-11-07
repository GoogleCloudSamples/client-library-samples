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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
'use strict';

const {v1beta1} = require('@google-cloud/binary-authorization');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.BinauthzManagementServiceV1Beta1Client();

/**
 * Lists attestors for a given Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listAttestors(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [attestors] = await client.listAttestors(request);

    if (attestors.length === 0) {
      console.log('No attestors found.');
      return;
    }

    for (const attestor of attestors) {
      console.log(`Attestor Name: ${attestor.name}`);
      console.log(`Attestor Description: ${attestor.description || 'N/A'}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when listing attestors:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Project resource not found:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else {
      console.error('Failed to list attestors:', err.message || err);
    }
  }
}

module.exports = { listAttestors };
// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]
