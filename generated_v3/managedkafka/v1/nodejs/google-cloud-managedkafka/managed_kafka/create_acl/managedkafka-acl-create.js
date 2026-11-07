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

// [START managedkafka_v1_managedkafka_acl_create]
'use strict';

const {ManagedKafkaClient} = require('@google-cloud/managedkafka');
const {status} = require('@grpc/grpc-js');

const client = new ManagedKafkaClient();

/**
 * Use the createAcl method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Kafka cluster is located (e.g., 'us-central1').
 * @param {string} clusterId - The ID of an existing Apache Kafka cluster (e.g., 'my-cluster').
 * @param {string} aclId - The caller-chosen ID to use for the ACL, defining the resource pattern (e.g., 'topic/my-topic', 'cluster', or 'allTopics').
 */
async function createAcl(projectId, locationId, clusterId, aclId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
    const acl = {
      aclEntries: [
        {
          principal: 'User:*',
          permissionType: 'ALLOW',
          operation: 'READ',
          host: '*',
        },
      ],
    };

    const request = {
      parent,
      aclId,
      acl,
    };

    const [response] = await client.createAcl(request);
    console.log(`Created ACL: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`ACL already exists: ${aclId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${clusterId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for ACL creation: ${err.message}`);
    } else {
      console.error(`Failed to create ACL: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAcl };
// [END managedkafka_v1_managedkafka_acl_create]
