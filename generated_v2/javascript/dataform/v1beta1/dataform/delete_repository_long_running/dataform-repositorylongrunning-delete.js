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

// [START dataform_v1beta1_dataform_repositorylongrunning_delete]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Deletes a Dataform repository using a long-running operation.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, "us-central1").
 * @param {string} repositoryId - The ID of the Dataform repository. This is a caller-chosen identifier.
 */
async function deleteRepositoryLongRunning(projectId, locationId, repositoryId) {
  try {
    const name = client.repositoryPath(projectId, locationId, repositoryId);

    // Initiate the long-running operation to delete the repository.
    const [operation] = await client.deleteRepositoryLongRunning({name});
    console.log(`Operation initiated: ${operation.name}`);

    // Wait for the operation to complete.
    await operation.promise();
    console.log(`Successfully deleted repository: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete repository: ${err.message}`);
    }
  }
}

module.exports = { deleteRepositoryLongRunning };
// [END dataform_v1beta1_dataform_repositorylongrunning_delete]
