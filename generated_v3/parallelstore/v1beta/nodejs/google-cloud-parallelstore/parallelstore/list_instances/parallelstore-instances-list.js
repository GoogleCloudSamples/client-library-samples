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

// [START parallelstore_v1beta_parallelstore_instances_list]
'use strict';

const {ParallelstoreClient} = require('@google-cloud/parallelstore');
const {status} = require('@grpc/grpc-js');

const client = new ParallelstoreClient();

/**
 * Lists Parallelstore instances in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (a Google Cloud zone, for example, 'us-central1-a', or '-' to list across all locations).
 */
async function listInstances(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [instances] = await client.listInstances({parent});

    console.log(`Listed ${instances.length} instance(s).`);
    for (const instance of instances) {
      console.log(`Instance: ${instance.name}`);
      console.log(`State: ${instance.state}`);
      console.log(`Capacity (GiB): ${instance.capacityGib}`);
    }
  } catch (err) {
    if (
      err.code === status.NOT_FOUND ||
      err.code === status.PERMISSION_DENIED ||
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.UNAUTHENTICATED
    ) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = {listInstances};
// [END parallelstore_v1beta_parallelstore_instances_list]
