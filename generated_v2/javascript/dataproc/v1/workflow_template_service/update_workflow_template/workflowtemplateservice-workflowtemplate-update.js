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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_update]
'use strict';

const {WorkflowTemplateServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Updates a Dataproc workflow template.
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the workflow template.
 * @param {string} locationId - The Dataproc region or location ID (for example, 'us-central1').
 * @param {string} workflowTemplateId - The user-assigned or pre-existing ID of the workflow template to update.
 */
async function updateWorkflowTemplate(projectId, locationId, workflowTemplateId) {
  // Configures the Dataproc regional endpoint.
  const client = new WorkflowTemplateServiceClient({
    apiEndpoint:
      locationId === 'global'
        ? 'dataproc.googleapis.com'
        : `${locationId}-dataproc.googleapis.com`,
  });

  try {
    // Constructs the resource name of the workflow template.
    const name = `projects/${projectId}/locations/${locationId}/workflowTemplates/${workflowTemplateId}`;

    // Retrieves the existing workflow template.
    const [existingTemplate] = await client.getWorkflowTemplate({name});

    // Mutates an inert field while preserving the version number for full replacement.
    const template = {
      ...existingTemplate,
      labels: {
        ...(existingTemplate.labels || {}),
        updated: 'true',
      },
    };

    // Submits the full replacement update request.
    const [response] = await client.updateWorkflowTemplate({
      template,
    });

    console.log(`Updated workflow template: ${response.name}`);
    console.log(`Workflow template version: ${response.version}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workflow template not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid workflow template data: ${err.message}`);
    } else {
      console.error(`Error updating workflow template: ${err.message}`);
    }
  }
}

module.exports = { updateWorkflowTemplate };
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_update]
