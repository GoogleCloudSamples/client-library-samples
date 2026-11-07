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

// [START dataform_v1beta1_dataform_query_compilation_result_actions]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Queries compilation result actions from a Dataform compilation result.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the Dataform repository.
 * @param {string} repositoryId - The caller-chosen ID of the Dataform repository.
 * @param {string} compilationResultId - The server-generated ID of the Dataform compilation result.
 */
async function queryCompilationResultActions(projectId, locationId, repositoryId, compilationResultId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/compilationResults/${compilationResultId}`;
    const request = {
      name,
    };

    const [actions] = await client.queryCompilationResultActions(request);
    console.log(`Retrieved ${actions.length} compilation result actions.`);

    for (const action of actions) {
      console.log(`Action target: ${action.target ? action.target.name : 'unnamed'}`);
      console.log(`Action file path: ${action.filePath}`);
    }

    return actions;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Compilation result resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing compilation result: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { queryCompilationResultActions };
// [END dataform_v1beta1_dataform_query_compilation_result_actions]
