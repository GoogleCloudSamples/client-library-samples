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

// [START dataform_v1_dataform_compute_repository_access_token_status]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Computes the access token status for a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Dataform repository.
 * @param {string} repositoryId - The caller-chosen identifier of the Dataform repository.
 */
async function computeRepositoryAccessTokenStatus(projectId, locationId, repositoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      name,
    };

    const [response] = await client.computeRepositoryAccessTokenStatus(request);
    console.log(`Repository access token status: ${response.tokenStatus}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing repository: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to compute repository access token status: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { computeRepositoryAccessTokenStatus };
// [END dataform_v1_dataform_compute_repository_access_token_status]
