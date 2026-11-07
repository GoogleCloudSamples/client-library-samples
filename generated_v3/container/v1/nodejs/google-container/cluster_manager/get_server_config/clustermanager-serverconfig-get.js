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

// [START container_v1_clustermanager_serverconfig_get]
'use strict';

const {ClusterManagerClient} = require('@google-cloud/container');
const {status} = require('@grpc/grpc-js');

const client = new ClusterManagerClient();

/**
 * Retrieves the Kubernetes Engine configuration for the specified location.
 */
async function getServerConfig() {
  const location = 'us-central1';

  try {
    const projectId = await client.getProjectId();
    // Construct the parent resource path from identifiers
    const name = `projects/${projectId}/locations/${location}`;

    const request = {
      name,
    };

    const [response] = await client.getServerConfig(request);
    console.log(`Default cluster version: ${response.defaultClusterVersion}`);
    if (response.validMasterVersions) {
      console.log(`Valid master versions: ${response.validMasterVersions.join(', ')}`);
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Server config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing server config: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error retrieving server config:', err);
    }
  }
}

module.exports = { getServerConfig };
// [END container_v1_clustermanager_serverconfig_get]
