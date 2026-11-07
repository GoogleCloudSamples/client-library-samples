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

// [START redis_v1_cloudredis_instanceauthstring_get]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Use the getInstanceAuthString method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Redis instance.
 * @param {string} locationId - The Google Cloud region where the Redis instance is provisioned (for example, 'us-central1').
 * @param {string} instanceId - The caller-chosen ID of the Redis instance (for example, 'example-redis-instance'). Must start with a letter, end with a letter or number, contain only lowercase letters, numbers, and hyphens, and be between 1 and 40 characters.
 */
async function getInstanceAuthString(projectId, locationId, instanceId) {
  try {
    const name = client.instancePath(projectId, locationId, instanceId);

    const request = {
      name,
    };

    const [response] = await client.getInstanceAuthString(request);
    console.log(`AUTH string: ${response.authString}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Redis instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Redis instance: ${err.message}`);
    } else {
      console.error(`API error retrieving AUTH string: ${err.message}`);
    }
  }
}

module.exports = { getInstanceAuthString };
// [END redis_v1_cloudredis_instanceauthstring_get]
