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

// [START osconfig_v1_osconfigservice_patchjob_get]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Retrieves the details and state of a patch job.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} patchJobId - ID of the PatchJob (for example, 'example-patchjob-id')
 */
async function getPatchJob(projectId, patchJobId) {
  try {
    const name = client.patchJobPath(projectId, patchJobId);
    const request = {
      name,
    };

    const [response] = await client.getPatchJob(request);

    console.log(`Patch job name: ${response.name}`);
    console.log(`Patch job state: ${response.state}`);
    console.log(`Patch deployment: ${response.patchDeployment}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch job not found: ${patchJobId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied retrieving patch job: ${patchJobId}`);
    } else {
      console.error(`Failed to retrieve patch job: ${err.message}`);
    }
  }
}

module.exports = { getPatchJob };
// [END osconfig_v1_osconfigservice_patchjob_get]
