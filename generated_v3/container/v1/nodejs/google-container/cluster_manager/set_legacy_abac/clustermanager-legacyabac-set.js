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

// [START container_v1_clustermanager_set_legacy_abac]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates the legacy ABAC configuration for a specified cluster.
 */
async function setLegacyAbac() {
  try {
    const enabled = true;
    const projectId = await client.getProjectId();
    const location = 'us-central1-a';
    const clusterId = 'cluster-1';

    const name = `projects/${projectId}/locations/${location}/clusters/${clusterId}`;

    const request = {
      name,
      enabled,
    };

    const [operation] = await client.setLegacyAbac(request);
    console.log(`SetLegacyAbac operation started: ${operation.name}`);
    console.log(`Status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Encountered error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {setLegacyAbac};
// [END container_v1_clustermanager_set_legacy_abac]
