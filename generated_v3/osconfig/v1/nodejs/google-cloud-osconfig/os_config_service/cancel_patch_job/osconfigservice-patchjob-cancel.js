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

// [START osconfig_v1_osconfigservice_patchjob_cancel]
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
    console.log(`Patch job canceled: ${response.name}`);
    console.log(`Patch job state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch job not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error canceling patch job: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { cancelPatchJob };
// [END osconfig_v1_osconfigservice_patchjob_cancel]
