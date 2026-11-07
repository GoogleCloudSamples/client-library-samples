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

// [START dataform_v1beta1_dataform_repository_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Deletes a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Dataform repository.
 * @param {string} locationId - The Google Cloud region for the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the repository to delete.
 */
async function deleteRepository(projectId, locationId, repositoryId) {
  const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

  try {
    const request = {
      name,
    };

    await client.deleteRepository(request);
    console.log(`Deleted repository: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Repository contains resources that must be removed prior to deletion: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while attempting to delete repository: ${name}`);
    } else {
      console.error(`Failed to delete repository: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteRepository };
// [END dataform_v1beta1_dataform_repository_delete]
