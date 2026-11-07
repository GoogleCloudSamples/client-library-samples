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

// [START osconfig_v1beta_osconfigservice_patchjob_cancel]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Use the cancelPatchJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} patchJobId - ID of the PatchJob (for example, 'example-patchjob-id')
 */
async function cancelPatchJob(projectId, patchJobId) {
  try {
    const name = client.patchJobPath(projectId, patchJobId);
    const request = {
      name,
    };

    const [response] = await client.cancelPatchJob(request);
    console.log(`Cancelled patch job: ${response.name}`);
    console.log(`Patch job state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch job ${patchJobId} was not found.`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Patch job ${patchJobId} cannot be cancelled in its current state.`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { cancelPatchJob };
// [END osconfig_v1beta_osconfigservice_patchjob_cancel]
