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

// [START container_v1_clustermanager_set_monitoring_service]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates the monitoring service for a Google Kubernetes Engine cluster.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone where the cluster is located.
 * @param {string} clusterId - The identifier of the cluster to configure monitoring for.
 */
async function setMonitoringService(projectId, locationId, clusterId) {
  try {
    const monitoringService = 'monitoring.googleapis.com/kubernetes';
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
      monitoringService,
    };

    const [operation] = await client.setMonitoringService(request);
    console.log(`Operation started: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered (${err.code}): ${err.message}`);
    }
  }
}

module.exports = { setMonitoringService };
// [END container_v1_clustermanager_set_monitoring_service]
