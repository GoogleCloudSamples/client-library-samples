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

// [START redis_v1beta1_cloudredis_instance_update]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Update the display name of an existing Cloud Redis instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis instance resides.
 * @param {string} instanceId - The caller-assigned identifier of the Redis instance to update.
 */
async function updateInstance(projectId, locationId, instanceId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };
    const instance = {
      name: `projects/${projectId}/locations/${locationId}/instances/${instanceId}`,
      displayName: 'Updated Redis Instance',
    };

    const request = {
      updateMask,
      instance,
    };

    // Initiate long-running update operation and wait for completion.
    const [operation] = await client.updateInstance(request);
    const [response] = await operation.promise();

    console.log(`Updated instance: ${response.name}`);
    console.log(`Updated display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateInstance };
// [END redis_v1beta1_cloudredis_instance_update]
