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

// [START workflows_v1_workflows_workflow_create]
'use strict';

const {WorkflowsClient} = require('@google-cloud/workflows');
const {status} = require('@grpc/grpc-js');

const client = new WorkflowsClient();

/**
 * Use the createWorkflow method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} workflowId - ID of the Workflow (for example, 'example-workflow-id')
 */
async function createWorkflow(projectId, locationId, workflowId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const workflow = {
      description: 'Example workflow',
      sourceContents: 'main:\n  steps:\n    - returnStep:\n        return: "Hello, World!"',
    };

    const [operation] = await client.createWorkflow({
      parent,
      workflow,
      workflowId,
    });

    const [response] = await operation.promise();
    console.log(`Created workflow: ${response.name}`);
    console.log(`State: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workflow ${workflowId} already exists:`, err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while creating workflow:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else {
      console.error('Unexpected error creating workflow:', err);
    }
  }
}

module.exports = { createWorkflow };
// [END workflows_v1_workflows_workflow_create]
