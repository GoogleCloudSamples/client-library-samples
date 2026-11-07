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

// [START redis_v1_cloudredis_instance_update]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Updates a Memorystore for Redis instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis instance is provisioned (for example, us-central1).
 * @param {string} instanceId - The Redis instance identifier.
 */
async function updateInstance(projectId, locationId, instanceId) {
  try {
    const instance = {
      name: `projects/${projectId}/locations/${locationId}/instances/${instanceId}`,
      displayName: 'Updated Redis Instance',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateInstance({
      instance,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Updated instance: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update instance: ${err.message}`);
    }
  }
}

module.exports = { updateInstance };
// [END redis_v1_cloudredis_instance_update]
