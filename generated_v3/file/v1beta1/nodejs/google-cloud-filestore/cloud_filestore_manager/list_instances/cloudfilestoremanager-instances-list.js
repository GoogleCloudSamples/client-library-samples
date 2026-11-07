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

// [START file_v1beta1_cloudfilestoremanager_instances_list]
'use strict';

const {CloudFilestoreManagerClient} = require('@google-cloud/filestore');
const {status} = require('@grpc/grpc-js');

const client = new CloudFilestoreManagerClient();

/**
 * Use the listInstances method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listInstances(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [instances] = await client.listInstances(request);
    console.log(`Retrieved ${instances.length} instance(s).`);
    for (const instance of instances) {
      console.log(`Instance name: ${instance.name}`);
      console.log(`State: ${instance.state}`);
      console.log(`Capacity: ${instance.capacityGb} GB`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location ${locationId} was not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when attempting to list instances.');
    } else {
      console.error('Failed to list instances:', err.message || err);
    }
  }
}

module.exports = { listInstances };
// [END file_v1beta1_cloudfilestoremanager_instances_list]
