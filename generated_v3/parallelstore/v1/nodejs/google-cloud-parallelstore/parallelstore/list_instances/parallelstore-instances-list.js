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

// [START parallelstore_v1_parallelstore_instances_list]
'use strict';

const {ParallelstoreClient} = require('@google-cloud/parallelstore');
const {status} = require('@grpc/grpc-js');

const client = new ParallelstoreClient();

/**
 * Lists Parallelstore instances in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud zone or location for the instances (for example, 'us-central1-a', or '-' to list across all locations).
 */
async function listInstances(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [instances] = await client.listInstances({parent});

    if (instances.length === 0) {
      console.log(`No instances found in ${parent}.`);
      return;
    }

    for (const instance of instances) {
      console.log(`Instance: ${instance.name}`);
      console.log(`Capacity: ${instance.capacityGib} GiB`);
      console.log(`State: ${instance.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listInstances};
// [END parallelstore_v1_parallelstore_instances_list]
