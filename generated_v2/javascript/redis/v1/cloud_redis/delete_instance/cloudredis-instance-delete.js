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

// [START redis_v1_cloudredis_instance_delete]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Use the deleteInstance method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Redis instance is located (for example, 'us-central1').
 * @param {string} instanceId - The caller-chosen ID of the Redis instance to delete (1-40 lowercase letters, numbers, or hyphens, starting with a letter).
 */
async function deleteInstance(projectId, locationId, instanceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;
    const [operation] = await client.deleteInstance({name});
    await operation.promise();
    console.log(`Deleted Redis instance: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Redis instance not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`Failed to delete instance: ${err.message}`);
    }
  }
}

module.exports = { deleteInstance };
// [END redis_v1_cloudredis_instance_delete]
