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

// [START managedkafka_v1_managedkafkaconnect_connectclusters_list]
'use strict';

const {ManagedKafkaConnectClient} = require('@google-cloud/managedkafka');
const {status} = require('@grpc/grpc-js');

const client = new ManagedKafkaConnectClient();

/**
 * Use the listConnectClusters method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listConnectClusters(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [connectClusters] = await client.listConnectClusters(request);

    console.log(`Found ${connectClusters.length} Connect cluster(s):`);
    for (const cluster of connectClusters) {
      console.log(`Cluster Name: ${cluster.name}`);
      console.log(`State: ${cluster.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found for parent resource: projects/${projectId}/locations/${locationId}`);
    } else {
      console.error(`Failed to list Connect clusters: ${err.message}`);
    }
  }
}

module.exports = { listConnectClusters };
// [END managedkafka_v1_managedkafkaconnect_connectclusters_list]
