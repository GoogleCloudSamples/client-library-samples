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

// [START run_v2_instances_instances_list]
'use strict';

const {InstancesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new InstancesClient();

/**
 * Lists Cloud Run instances in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the instances are located (for example, 'us-central1').
 */
async function listInstances(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [instances] = await client.listInstances(request);

    if (!instances || instances.length === 0) {
      console.log('No instances found.');
    } else {
      for (const instance of instances) {
        console.log(`Instance: ${instance.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listInstances};
// [END run_v2_instances_instances_list]
