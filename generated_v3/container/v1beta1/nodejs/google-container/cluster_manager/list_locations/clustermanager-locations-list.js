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

// [START container_v1beta1_clustermanager_locations_list]
'use strict';

const {v1beta1} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.ClusterManagerClient();

/**
 * Lists available Kubernetes Engine locations for a given project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listLocations(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [response] = await client.listLocations(request);
    console.log(`Locations for ${parent}:`);
    if (response.locations) {
      for (const location of response.locations) {
        console.log(`- ${location.name} (${location.type})`);
      }
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing project ${projectId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listLocations };
// [END container_v1beta1_clustermanager_locations_list]
