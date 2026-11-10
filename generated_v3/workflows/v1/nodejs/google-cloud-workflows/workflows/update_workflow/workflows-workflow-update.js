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

// [START workflows_v1_workflows_workflow_update]
'use strict';

const {WorkflowsClient} = require('@google-cloud/workflows');
const {status} = require('@grpc/grpc-js');

const client = new WorkflowsClient();

/**
 * Use the updateWorkflow method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} workflowId - The ID of the existing workflow to update.
 */
async function updateWorkflow(projectId, locationId, workflowId) {
  try {
    const workflow = {
      name: client.workflowPath(projectId, locationId, workflowId),
      description: 'Updated workflow description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // Initiates the workflow update operation
    const [operation] = await client.updateWorkflow({
      workflow,
      updateMask,
    });

    // Waits for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Updated workflow: ${response.name}`);
    console.log(`Description: ${response.description}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workflow ${workflowId} not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied updating workflow: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error updating workflow: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateWorkflow };
// [END workflows_v1_workflows_workflow_update]
