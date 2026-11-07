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

// [START datafusion_v1beta1_datafusion_instances_list]
'use strict';

const {DataFusionClient} = require('@google-cloud/data-fusion');
const {status} = require('@grpc/grpc-js');

const client = new DataFusionClient();

/**
 * Use the listInstances method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the instance is located (for example, 'us-central1'), or '-' to aggregate across all regions.
 */
async function listInstances(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [instances] = await client.listInstances(request);

    for (const instance of instances) {
      console.log(`Instance name: ${instance.name}`);
      console.log(`State: ${instance.state}`);
      console.log(`Type: ${instance.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing Cloud Data Fusion instances: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listInstances };
// [END datafusion_v1beta1_datafusion_instances_list]
