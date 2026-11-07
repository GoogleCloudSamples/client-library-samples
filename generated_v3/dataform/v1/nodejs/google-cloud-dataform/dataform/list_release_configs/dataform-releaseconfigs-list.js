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

// [START dataform_v1_dataform_releaseconfigs_list]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the listReleaseConfigs method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the repository is located (for example, 'us-central1').
 * @param {string} repositoryId - The caller-chosen ID of the Dataform repository (for example, 'example-repository-id').
 */
async function listReleaseConfigs(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const [releaseConfigs] = await client.listReleaseConfigs({parent});

    for (const releaseConfig of releaseConfigs) {
      console.log(`Release config: ${releaseConfig.name}`);
      console.log(`Git commitish: ${releaseConfig.gitCommitish}`);
      if (releaseConfig.cronSchedule) {
        console.log(`Cron schedule: ${releaseConfig.cronSchedule}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listReleaseConfigs };
// [END dataform_v1_dataform_releaseconfigs_list]
