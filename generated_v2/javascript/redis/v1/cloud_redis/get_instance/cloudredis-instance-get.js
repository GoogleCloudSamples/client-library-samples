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

// [START redis_v1_cloudredis_instance_get]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Retrieves details of a specific Redis instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} instanceId - The logical identifier of the Redis instance (for example, 'example-redis-instance')
 */
async function getInstance(projectId, locationId, instanceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

    const [instance] = await client.getInstance({name});

    console.log(`Instance: ${instance.name}`);
    console.log(`Host: ${instance.host}`);
    console.log(`Port: ${instance.port}`);
    console.log(`State: ${instance.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to get instance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstance };
// [END redis_v1_cloudredis_instance_get]
