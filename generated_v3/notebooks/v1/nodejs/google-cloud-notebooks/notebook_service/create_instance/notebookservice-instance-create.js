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

// [START notebooks_v1_notebookservice_instance_create]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new NotebookServiceClient();

/**
 * Creates a Vertex AI Workbench user-managed notebook instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or zone where the service is located (for example, 'us-central1-a')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 */
async function createInstance(projectId, locationId, instanceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const instance = {
      machineType: 'n1-standard-4',
      vmImage: {
        project: 'deeplearning-platform-release',
        imageFamily: 'tf-latest-cpu',
      },
    };

    const request = {
      parent,
      instanceId,
      instance,
    };

    const [operation] = await client.createInstance(request);
    const [response] = await operation.promise();
    console.log(`Created notebook instance: ${response.name}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`API error (${err.code}): ${err.details || err.message}`);
    } else {
      console.error('Error creating notebook instance:', err.message);
    }
  }
}

module.exports = { createInstance };
// [END notebooks_v1_notebookservice_instance_create]
