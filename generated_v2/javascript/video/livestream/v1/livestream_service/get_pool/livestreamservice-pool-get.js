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

// [START livestream_v1_livestreamservice_pool_get]
'use strict';

const {LivestreamServiceClient} = require('@google-cloud/livestream');
const {status} = require('@grpc/grpc-js');

const client = new LivestreamServiceClient();

/**
 * Retrieves details of a specific pool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the pool is located (for example, 'us-central1').
 * @param {string} poolId - The ID of the pool resource (for example, 'default').
 */
async function getPool(projectId, locationId, poolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/pools/${poolId}`;
    const [pool] = await client.getPool({name});

    console.log(`Pool name: ${pool.name}`);
    console.log(`Network: ${pool.network}`);
    return pool;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Pool not found: projects/${projectId}/locations/${locationId}/pools/${poolId}`);
    } else {
      console.error(`Error retrieving pool: ${err.message}`);
    }
  }
}

module.exports = { getPool };
// [END livestream_v1_livestreamservice_pool_get]
