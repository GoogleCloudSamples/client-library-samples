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

// [START dataform_v1beta1_dataform_releaseconfig_create]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Creates a release config in a Dataform repository.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The Google Cloud region where the repository is located.
 * @param {string} repositoryId The ID of the repository.
 * @param {string} releaseConfigId The ID of the release config.
 */
async function createReleaseConfig(projectId, locationId, repositoryId, releaseConfigId) {
  try {
    const parent = client.repositoryPath(projectId, locationId, repositoryId);
    const releaseConfig = {
      gitCommitish: 'main',
    };

    const request = {
      parent,
      releaseConfig,
      releaseConfigId,
    };

    const [response] = await client.createReleaseConfig(request);
    console.log(`Created release config: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Release config ${releaseConfigId} already exists.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Repository ${repositoryId} not found.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create release config: ${err.message}`);
    }
  }
}

module.exports = {createReleaseConfig};
// [END dataform_v1beta1_dataform_releaseconfig_create]
