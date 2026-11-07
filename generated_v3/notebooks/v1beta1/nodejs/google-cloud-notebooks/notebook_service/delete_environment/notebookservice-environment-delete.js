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

// [START notebooks_v1beta1_notebookservice_environment_delete]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new NotebookServiceClient();

/**
 * Use the deleteEnvironment method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location (region or zone) where the environment resides (for example, 'us-central1-a').
 * @param {string} environmentId - The user-defined ID of the notebook environment to delete (for example, 'example-environment-id'). Must be 1 to 63 characters long, starting with a lowercase letter and containing only lowercase letters, digits, and hyphens.
 */
async function deleteEnvironment(projectId, locationId, environmentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/environments/${environmentId}`;

    const [operation] = await client.deleteEnvironment({name});
    await operation.promise();

    console.log(`Deleted environment: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Environment not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteEnvironment };
// [END notebooks_v1beta1_notebookservice_environment_delete]
