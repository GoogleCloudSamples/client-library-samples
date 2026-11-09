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

// [START dataform_v1beta1_dataform_releaseconfig_update]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Updates a release configuration in a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Dataform repository.
 * @param {string} repositoryId - The ID of the Dataform repository.
 * @param {string} releaseConfigId - The ID of the release configuration to update.
 */
async function updateReleaseConfig(projectId, locationId, repositoryId, releaseConfigId) {
  try {
    // Construct the resource name and toggle compilation scheduling via the disabled property.
    // The gitCommitish field is required by the Dataform API schema for ReleaseConfig.
    const releaseConfig = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/releaseConfigs/${releaseConfigId}`,
      gitCommitish: 'main',
      disabled: true,
    };
    const updateMask = {
      paths: ['disabled'],
    };

    const [response] = await client.updateReleaseConfig({
      releaseConfig,
      updateMask,
    });

    console.log(`Updated release configuration: ${response.name}`);
    console.log(`Disabled: ${response.disabled}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Release configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error updating release configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateReleaseConfig };
// [END dataform_v1beta1_dataform_releaseconfig_update]
