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

// [START container_v1beta1_clustermanager_set_locations]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates locations for an existing Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone for the cluster.
 * @param {string} clusterId - The identifier of the cluster to update.
 */
async function setLocations(projectId, locationId, clusterId) {
  try {
    const locations = locationId;
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
      locations: [locations],
    };

    const [operation] = await client.setLocations(request);
    console.log(`Set locations operation initiated: ${operation.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to set locations: ${err.message}`);
    }
  }
}

module.exports = {setLocations};
// [END container_v1beta1_clustermanager_set_locations]
