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

// [START container_v1beta1_clustermanager_serverconfig_get]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Retrieves the server configuration for Google Kubernetes Engine.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or zone (for example, 'us-central1' or 'us-central1-a') for the server configuration.
 */
async function getServerConfig(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;
    const request = {
      name,
    };

    const [response] = await client.getServerConfig(request);

    console.log(`Default cluster version: ${response.defaultClusterVersion}`);
    console.log(`Valid master versions: ${response.validMasterVersions?.join(', ')}`);
    console.log(`Valid node versions: ${response.validNodeVersions?.join(', ')}`);
    console.log(`Valid image types: ${response.validImageTypes?.join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server configuration not found for location '${locationId}': ${err.details || err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing server configuration: ${err.details || err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error [code ${err.code}]: ${err.details || err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message || err}`);
    }
  }
}

module.exports = { getServerConfig };
// [END container_v1beta1_clustermanager_serverconfig_get]
