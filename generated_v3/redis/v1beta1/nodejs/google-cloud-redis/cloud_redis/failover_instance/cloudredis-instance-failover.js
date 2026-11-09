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

// [START redis_v1beta1_cloudredis_failover_instance]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Initiates a failover on a Google Cloud Memorystore for Redis instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 */
async function failoverInstance(projectId, locationId, instanceId) {
  const name = client.instancePath(projectId, locationId, instanceId);

  try {
    const request = {
      name,
      dataProtectionMode: 'LIMITED_DATA_LOSS',
    };

    const [operation] = await client.failoverInstance(request);
    const [response] = await operation.promise();
    console.log(`Failover completed for instance: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Redis instance not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failover precondition failed for instance ${name}: ${err.message}`);
    } else {
      console.error(`Failed to failover Redis instance ${name}:`, err);
    }
  }
}

module.exports = { failoverInstance };
// [END redis_v1beta1_cloudredis_failover_instance]
