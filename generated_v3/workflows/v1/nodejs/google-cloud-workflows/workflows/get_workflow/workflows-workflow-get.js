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

// [START workflows_v1_workflows_workflow_get]
'use strict';

const {WorkflowsClient} = require('@google-cloud/workflows');
const {status} = require('@grpc/grpc-js');

const client = new WorkflowsClient();

/**
 * Use the getWorkflow method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} workflowId - ID of the Workflow (for example, 'example-workflow-id')
 */
async function getWorkflow(projectId, locationId, workflowId) {
  try {
    const name = client.workflowPath(projectId, locationId, workflowId);
    const [workflow] = await client.getWorkflow({name});

    console.log(`Workflow name: ${workflow.name}`);
    console.log(`State: ${workflow.state}`);
    console.log(`Revision ID: ${workflow.revisionId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workflow not found.`);
    } else {
      console.error(`Error executing getWorkflow: ${err.message}`);
    }
  }
}

module.exports = { getWorkflow };
// [END workflows_v1_workflows_workflow_get]
