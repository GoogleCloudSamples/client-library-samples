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

// [START run_v2_instances_start_instance]
'use strict';

const {InstancesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new InstancesClient();

/**
 * Use the startInstance method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the instance is located (for example, 'us-central1').
 * @param {string} instanceId - The identifier of the Cloud Run instance to start (for example, 'my-instance').
 */
async function startInstance(projectId, locationId, instanceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

    const request = {
      name,
    };

    const [operation] = await client.startInstance(request);
    const [response] = await operation.promise();

    console.log(`Started instance: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Instance state error: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err}`);
    }
  }
}

module.exports = { startInstance };
// [END run_v2_instances_start_instance]
