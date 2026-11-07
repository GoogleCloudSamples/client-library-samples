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

// [START container_v1_clustermanager_set_logging_service]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Use the setLoggingService method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone of the cluster.
 * @param {string} clusterId - The name of the cluster.
 */
async function setLoggingService(projectId, locationId, clusterId) {
  try {
    const loggingService = 'logging.googleapis.com/kubernetes';
    const name = `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`;

    const request = {
      name,
      loggingService,
    };

    const [operation] = await client.setLoggingService(request);
    console.log(`Set logging service operation initiated: ${operation.name}`);
    console.log(`Operation status: ${operation.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
  }
}

module.exports = { setLoggingService };
// [END container_v1_clustermanager_set_logging_service]
