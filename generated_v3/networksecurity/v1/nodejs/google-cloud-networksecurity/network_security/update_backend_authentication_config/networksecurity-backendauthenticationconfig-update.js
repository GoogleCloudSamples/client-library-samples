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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_update]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

/**
 * Initializes the NetworkSecurityClient, falling back to v1beta1 if the
 * method is not yet exposed in the v1 API surface of the installed SDK.
 */
function createNetworkSecurityClient() {
  if (networkSecurity.v1 && networkSecurity.v1.NetworkSecurityClient) {
    const client = new networkSecurity.v1.NetworkSecurityClient();
    if (typeof client.updateBackendAuthenticationConfig === 'function') {
      return client;
    }
  }
  if (networkSecurity.v1beta1 && networkSecurity.v1beta1.NetworkSecurityClient) {
    const client = new networkSecurity.v1beta1.NetworkSecurityClient();
    if (typeof client.updateBackendAuthenticationConfig === 'function') {
      return client;
    }
  }
  return new networkSecurity.NetworkSecurityClient();
}

const client = createNetworkSecurityClient();

/**
 * Updates a BackendAuthenticationConfig resource.
 *
 * @param {string} projectId Google Cloud project ID.
 * @param {string} locationId Google Cloud location ID (for example, 'global' or a supported region).
 * @param {string} backendAuthenticationConfigId The ID of the BackendAuthenticationConfig to update.
 */
async function updateBackendAuthenticationConfig(projectId, locationId, backendAuthenticationConfigId) {
  try {
    const backendAuthenticationConfig = {
      name: `projects/${projectId}/locations/${locationId}/backendAuthenticationConfigs/${backendAuthenticationConfigId}`,
      description: 'Updated backend authentication config',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateBackendAuthenticationConfig({
      backendAuthenticationConfig,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Backend authentication config updated: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backend authentication config not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Failed precondition: ${err.message}`);
    } else {
      console.error(`Error updating backend authentication config: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateBackendAuthenticationConfig };
// [END networksecurity_v1_networksecurity_backendauthenticationconfig_update]
