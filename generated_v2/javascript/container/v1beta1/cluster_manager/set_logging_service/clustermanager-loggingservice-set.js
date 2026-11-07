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

// [START container_v1beta1_clustermanager_set_logging_service]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Updates the logging service for an existing GKE cluster.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the target GKE cluster.
 * @param {string} locationId - The Compute Engine zone or region where the cluster resides.
 * @param {string} clusterId - The name of an existing GKE cluster in RUNNING state.
 */
async function setLoggingService(projectId, locationId, clusterId) {
  try {
    // Enable Cloud Logging using the Kubernetes-native resource model.
    const loggingService = 'logging.googleapis.com/kubernetes';
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
      loggingService,
    };

    const [operation] = await client.setLoggingService(request);
    console.log(`Set logging service operation started: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cluster not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { setLoggingService };
// [END container_v1beta1_clustermanager_set_logging_service]
