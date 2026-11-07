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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_create]
'use strict';

const {WorkflowTemplateServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

const client = new WorkflowTemplateServiceClient();

/**
 * Use the createWorkflowTemplate method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) ID where the workflow template will be created (for example, 'us-central1').
 * @param {string} workflowTemplateId - The ID of the workflow template to create. This is caller-chosen and must start with a letter, containing only letters, numbers, and hyphens.
 */
async function createWorkflowTemplate(projectId, locationId, workflowTemplateId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const placement = {
      clusterSelector: {
        clusterLabels: {
          'goog-dataproc-cluster-name': 'example-cluster',
        },
      },
    };

    const jobs = [
      {
        stepId: 'example-step',
        sparkJob: {
          mainJarFileUri: 'file:///usr/lib/spark/examples/jars/spark-examples.jar',
          args: ['1000'],
        },
      },
    ];

    const template = {
      id: workflowTemplateId,
      placement,
      jobs,
    };

    const [createdTemplate] = await client.createWorkflowTemplate({
      parent,
      template,
    });

    console.log(`Created workflow template: ${createdTemplate.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Workflow template already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createWorkflowTemplate };
// [END dataproc_v1_workflowtemplateservice_workflowtemplate_create]
