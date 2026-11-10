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

// [START netapp_v1_netapp_storagepools_list]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Lists Cloud NetApp storage pools in a given location.
 */
async function listStoragePools() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const [storagePools] = await client.listStoragePools({parent});

    console.log(`Found ${storagePools.length} storage pool(s).`);
    for (const pool of storagePools) {
      console.log(`Name: ${pool.name}`);
      console.log(`Service level: ${pool.serviceLevel}`);
      console.log(`Capacity: ${pool.capacityGib} GiB`);
      console.log(`State: ${pool.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listStoragePools };
// [END netapp_v1_netapp_storagepools_list]
