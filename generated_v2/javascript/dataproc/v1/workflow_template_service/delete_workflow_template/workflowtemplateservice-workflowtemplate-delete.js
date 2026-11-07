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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
'use strict';

const {WorkflowTemplateServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a workflow template.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location or region ID (for example, 'us-central1').
 * @param {string} workflowTemplateId - The ID of the workflow template (for example, 'example-workflow-template').
 */
async function deleteWorkflowTemplate(projectId, locationId, workflowTemplateId) {
  const client = new WorkflowTemplateServiceClient({
    apiEndpoint: locationId === 'global' ? 'dataproc.googleapis.com' : `${locationId}-dataproc.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/workflowTemplates/${workflowTemplateId}`;

  const request = {
    name,
  };

  try {
    await client.deleteWorkflowTemplate(request);
    console.log(`Deleted workflow template: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workflow template not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for workflow template: ${name}`);
    } else {
      console.error(`Failed to delete workflow template: ${err.message}`);
    }
  }
}

module.exports = {deleteWorkflowTemplate};
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_delete]
