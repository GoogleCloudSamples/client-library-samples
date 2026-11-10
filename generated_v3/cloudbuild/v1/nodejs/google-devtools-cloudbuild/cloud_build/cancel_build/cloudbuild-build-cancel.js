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

// [START cloudbuild_v1_cloudbuild_build_cancel]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Use the cancelBuild method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} id - ID of the Id (for example, 'example-id-id')
 */
async function cancelBuild(projectId, id) {
  try {
    const request = {
      projectId: projectId,
      id: id,
    };

    const [response] = await client.cancelBuild(request);
    console.log(`Cancelled build ID: ${response.id}`);
    console.log(`Build status: ${response.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Build ${id} not found in project ${projectId}.`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Build ${id} cannot be cancelled in its current state.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while attempting to cancel build ${id}.`);
    } else {
      console.error('Failed to cancel build:', err.message);
    }
  }
}

module.exports = { cancelBuild };
// [END cloudbuild_v1_cloudbuild_build_cancel]
