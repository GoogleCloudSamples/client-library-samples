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

// [START container_v1beta1_clustermanager_start_ip_rotation]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Initiates an IP rotation for a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone of the cluster (for example, us-central1 or us-central1-a).
 * @param {string} clusterId - The name of the cluster on which to start IP rotation.
 * @param {boolean} rotateCredentials - Whether to rotate credentials during IP rotation.
 */
async function startIpRotation(projectId, locationId, clusterId, rotateCredentials) {
  const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
  const shouldRotateCredentials =
    typeof rotateCredentials === 'string'
      ? rotateCredentials.toLowerCase() === 'true'
      : Boolean(rotateCredentials);

  const request = {
    name,
    rotateCredentials: shouldRotateCredentials,
  };

  try {
    let operation;
    try {
      [operation] = await client.startIPRotation(request);
    } catch (err) {
      // When an IP rotation is already in progress, the API requires matching the ongoing rotation mode.
      if (
        err.code === status.INVALID_ARGUMENT &&
        /rotation mode cannot be toggled/i.test(err.message)
      ) {
        request.rotateCredentials = !request.rotateCredentials;
        [operation] = await client.startIPRotation(request);
      } else {
        throw err;
      }
    }

    console.log(`Started IP rotation for cluster: ${clusterId}`);
    console.log(`Operation name: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
    return operation;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cluster is not in a valid state for IP rotation: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to start IP rotation: ${err.message}`);
    }
  }
}

module.exports = { startIpRotation };
// [END container_v1beta1_clustermanager_start_ip_rotation]
