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

// [START container_v1_clustermanager_check_autopilot_compatibility]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Evaluates a GKE cluster for Autopilot compatibility.
 *
 * @param {string} projectId - Google Cloud project ID hosting the GKE cluster.
 * @param {string} locationId - Google Cloud region or zone where the cluster is located (for example, 'us-central1' or 'us-central1-a').
 * @param {string} clusterId - Name of the GKE cluster to evaluate.
 */
async function checkAutopilotCompatibility(projectId, locationId, clusterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;
    const request = {
      name,
    };

    const [response] = await client.checkAutopilotCompatibility(request);
    console.log(`Compatibility evaluation completed for: ${name}`);

    if (response.issues && response.issues.length > 0) {
      console.log(`Found ${response.issues.length} compatibility issue(s):`);
      for (const issue of response.issues) {
        console.log(`- ${issue.summary}: ${issue.description}`);
      }
    } else {
      console.log('No Autopilot compatibility issues detected.');
    }
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(`Autopilot compatibility auditing is not enabled for cluster: ${clusterId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Cluster not found: ${clusterId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied for cluster: ${clusterId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Invalid argument provided for cluster: ${clusterId}`);
    } else {
      throw err;
    }
  }
}

module.exports = {checkAutopilotCompatibility};
// [END container_v1_clustermanager_check_autopilot_compatibility]
