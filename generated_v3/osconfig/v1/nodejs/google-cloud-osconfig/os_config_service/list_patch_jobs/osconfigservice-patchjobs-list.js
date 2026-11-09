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

// [START osconfig_v1_osconfigservice_patchjobs_list]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Lists patch jobs in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listPatchJobs(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [patchJobs] = await client.listPatchJobs(request);
    for (const patchJob of patchJobs) {
      console.log(`Patch job name: ${patchJob.name}`);
      console.log(`Patch job state: ${patchJob.state}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing patch jobs:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Specified project resource not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with status code ${err.code}:`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { listPatchJobs };
// [END osconfig_v1_osconfigservice_patchjobs_list]
