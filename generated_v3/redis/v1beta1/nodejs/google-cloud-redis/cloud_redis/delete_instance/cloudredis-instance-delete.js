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

// [START redis_v1beta1_cloudredis_instance_delete]
'use strict';

const {CloudRedisClient} = require('@google-cloud/redis');
const {status} = require('@grpc/grpc-js');

const client = new CloudRedisClient();

/**
 * Use the deleteInstance method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 */
async function deleteInstance(projectId, locationId, instanceId) {
  try {
    const name = client.instancePath(projectId, locationId, instanceId);
    const [operation] = await client.deleteInstance({name});
    await operation.promise();
    console.log(`Deleted instance: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found at path: ${projectId}/${locationId}/${instanceId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for the requested operation.');
    } else {
      console.error(`Operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { deleteInstance };
// [END redis_v1beta1_cloudredis_instance_delete]
