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

// [START workflows_v1_workflows_workflowrevisions_list]
'use strict';

const {WorkflowsClient} = require('@google-cloud/workflows');
const {status} = require('@grpc/grpc-js');

const client = new WorkflowsClient();

/**
 * Use the listWorkflowRevisions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} workflowId - ID of the Workflow (for example, 'example-workflow-id')
 */
async function listWorkflowRevisions(projectId, locationId, workflowId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/workflows/${workflowId}`;
    const request = {
      name,
    };

    const [revisions] = await client.listWorkflowRevisions(request);

    for (const revision of revisions) {
      console.log(`Revision: ${revision.name}`);
      console.log(`Revision ID: ${revision.revisionId}`);
      console.log(`State: ${revision.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listWorkflowRevisions };
// [END workflows_v1_workflows_workflowrevisions_list]
