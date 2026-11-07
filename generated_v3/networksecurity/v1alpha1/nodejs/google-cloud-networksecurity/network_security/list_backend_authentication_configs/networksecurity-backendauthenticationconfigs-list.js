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

// [START networksecurity_v1alpha1_networksecurity_backendauthenticationconfigs_list]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha1.NetworkSecurityClient();

/**
 * Lists BackendAuthenticationConfig resources in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1')
 */
async function listBackendAuthenticationConfigs(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [configs] = await client.listBackendAuthenticationConfigs({
      parent,
    });

    for (const config of configs) {
      console.log(`Backend Authentication Config: ${config.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Service error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackendAuthenticationConfigs };
// [END networksecurity_v1alpha1_networksecurity_backendauthenticationconfigs_list]
