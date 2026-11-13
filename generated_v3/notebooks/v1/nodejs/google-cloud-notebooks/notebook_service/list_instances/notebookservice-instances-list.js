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

// [START notebooks_v1_notebookservice_instances_list]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Notebooks instances in a given project and location.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} location_id - The Google Cloud location where the service is located (for example, 'us-central1')
 */
async function listInstances(project_id, location_id) {
  const client = new NotebookServiceClient();

  try {
    const parent = `projects/${project_id}/locations/${location_id}`;
    const request = {
      parent,
    };

    const [instances] = await client.listInstances(request);

    if (instances.length === 0) {
      console.log('No instances found.');
    } else {
      for (const instance of instances) {
        console.log(`Instance Name: ${instance.name}`);
        console.log(`State: ${instance.state}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Encountered error while listing instances: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {listInstances};
// [END notebooks_v1_notebookservice_instances_list]
