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

// [START dataproc_v1_workflowtemplateservice_workflowtemplates_list]
'use strict';

const {WorkflowTemplateServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Dataproc workflow templates in a project and region.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} regionId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listWorkflowTemplates(projectId, regionId) {
  const client = new WorkflowTemplateServiceClient({
    apiEndpoint:
      regionId && regionId !== 'global'
        ? `${regionId}-dataproc.googleapis.com`
        : undefined,
  });

  try {
    const parent = client.regionPath(projectId, regionId);
    const request = {
      parent,
    };

    const [templates] = await client.listWorkflowTemplates(request);

    if (!templates || templates.length === 0) {
      console.log('No workflow templates found.');
      return;
    }

    for (const template of templates) {
      console.log(`Template ID: ${template.id}, Name: ${template.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Error listing workflow templates: ${err.message || err}`);
    }
  }
}

module.exports = {listWorkflowTemplates};
// [END dataproc_v1_workflowtemplateservice_workflowtemplates_list]
