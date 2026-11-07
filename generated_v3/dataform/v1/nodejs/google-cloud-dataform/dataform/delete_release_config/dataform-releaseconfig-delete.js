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

// [START dataform_v1_dataform_releaseconfig_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the deleteReleaseConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region containing the repository.
 * @param {string} repositoryId - The ID of the Dataform repository containing the release config.
 * @param {string} releaseConfigId - The caller-chosen ID of the release config to delete.
 */
async function deleteReleaseConfig(projectId, locationId, repositoryId, releaseConfigId) {
  const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/releaseConfigs/${releaseConfigId}`;

  try {
    const request = {
      name,
    };

    await client.deleteReleaseConfig(request);
    console.log(`Deleted release config: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Release config not found: ${name}`);
    } else {
      console.error(`Failed to delete release config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteReleaseConfig };
// [END dataform_v1_dataform_releaseconfig_delete]
