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

// [START container_v1_clustermanager_start_ip_rotation]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Initiates an IP rotation for a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The compute zone or region where the cluster is located.
 * @param {string} clusterId - The name of the GKE cluster.
 * @param {boolean} rotateCredentials - Whether to rotate cluster certificates along with the IP address.
 */
async function startIpRotation(projectId, locationId, clusterId, rotateCredentials) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
    const request = {
      name,
      rotateCredentials,
    };

    const [operation] = await client.startIPRotation(request);
    console.log(`IP rotation initiated for cluster: ${clusterId}`);
    console.log(`Operation name: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API error (${err.code}): ${err.details || err.message}`);
      return;
    }
    throw err;
  }
}

module.exports = { startIpRotation };
// [END container_v1_clustermanager_start_ip_rotation]
