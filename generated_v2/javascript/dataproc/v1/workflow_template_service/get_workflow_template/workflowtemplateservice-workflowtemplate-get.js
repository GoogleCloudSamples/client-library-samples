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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_get]
'use strict';

const {WorkflowTemplateServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a workflow template from Google Cloud Dataproc.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} regionId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} templateId - ID of the Template (for example, 'example-template-id')
 */
async function getWorkflowTemplate(projectId, regionId, templateId) {
  const client = new WorkflowTemplateServiceClient({
    apiEndpoint:
      regionId === 'global'
        ? 'dataproc.googleapis.com'
        : `${regionId}-dataproc.googleapis.com`,
  });

  try {
    const name = client.projectRegionWorkflowTemplatePath(
      projectId,
      regionId,
      templateId
    );

    const request = {
      name,
    };

    const [response] = await client.getWorkflowTemplate(request);

    console.log(`Workflow template retrieved: ${response.name}`);
    console.log(`Template ID: ${response.id}`);
    console.log(`Version: ${response.version}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Workflow template not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing workflow template: ${err.message}`);
    } else {
      console.error(`Failed to retrieve workflow template: ${err.message}`);
    }
  }
}

module.exports = { getWorkflowTemplate };
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_get]
