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

// [START redis_v1beta1_cloudredis_instance_create]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Use the createInstance method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 */
async function createInstance(projectId, locationId, instanceId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const instance = {
      tier: 'BASIC',
      memorySizeGb: 1,
    };

    const request = {
      parent,
      instanceId,
      instance,
    };

    const [operation] = await client.createInstance(request);
    const [response] = await operation.promise();

    console.log(`Created instance: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Instance ${instanceId} already exists in ${projectId}/${locationId}.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for instance creation: ${err.message}`);
    } else {
      console.error(`Failed to create instance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createInstance };
// [END redis_v1beta1_cloudredis_instance_create]
