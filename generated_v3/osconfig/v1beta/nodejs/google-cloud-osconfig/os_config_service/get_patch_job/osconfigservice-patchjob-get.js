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

// [START osconfig_v1beta_osconfigservice_patchjob_get]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Retrieves the status and details of a specific OS patch job.
 *
 * @param {string} projectId - The Google Cloud project ID where the patch job was executed.
 * @param {string} patchJobId - The server-generated identifier of the patch job.
 */
async function getPatchJob(projectId, patchJobId) {
  try {
    const name = `projects/${projectId}/patchJobs/${patchJobId}`;

    const request = {
      name,
    };

    const [patchJob] = await client.getPatchJob(request);

    console.log(`Patch Job: ${patchJob.name}`);
    console.log(`State: ${patchJob.state}`);
    console.log(`Create Time: ${patchJob.createTime?.seconds}`);
    return patchJob;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Patch job not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing patch job: ${err.message}`);
    } else {
      console.error(`OS Config API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getPatchJob };
// [END osconfig_v1beta_osconfigservice_patchjob_get]
