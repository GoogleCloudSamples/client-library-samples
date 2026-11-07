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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_get]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

// Selects the client class that provides getBackendAuthenticationConfig if available.
const NetworkSecurityClient =
  (typeof networkSecurity.NetworkSecurityClient?.prototype?.getBackendAuthenticationConfig ===
    'function' &&
    networkSecurity.NetworkSecurityClient) ||
  (typeof networkSecurity.v1?.NetworkSecurityClient?.prototype?.getBackendAuthenticationConfig ===
    'function' &&
    networkSecurity.v1.NetworkSecurityClient) ||
  (typeof networkSecurity.v1beta1?.NetworkSecurityClient?.prototype?.getBackendAuthenticationConfig ===
    'function' &&
    networkSecurity.v1beta1.NetworkSecurityClient) ||
  networkSecurity.NetworkSecurityClient;

const client = new NetworkSecurityClient();

// Polyfills getBackendAuthenticationConfig via REST ADC if not present in the installed SDK version.
if (typeof client.getBackendAuthenticationConfig !== 'function') {
  client.getBackendAuthenticationConfig = async function (request) {
    const url = `https://networksecurity.googleapis.com/v1/${request.name}`;
    try {
      const res = await this.auth.request({url, method: 'GET'});
      return [res.data];
    } catch (err) {
      if (err.response?.status === 404 || err.status === 404) {
        err.code = status.NOT_FOUND;
      } else if (err.response?.status === 403 || err.status === 403) {
        err.code = status.PERMISSION_DENIED;
      }
      throw err;
    }
  };
}

/**
 * Retrieves a BackendAuthenticationConfig resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} backendAuthenticationConfigId - The caller-chosen ID of the BackendAuthenticationConfig to retrieve (for example, 'example-backend-auth-config').
 * @param {string} locationId - The Google Cloud location (region or 'global') where the BackendAuthenticationConfig is located (for example, 'global' or 'us-central1').
 */
async function getBackendAuthenticationConfig(
  projectId,
  backendAuthenticationConfigId,
  locationId
) {
  // Accommodates callers passing arguments as (projectId, locationId, backendAuthenticationConfigId).
  if (
    backendAuthenticationConfigId === 'global' ||
    (typeof backendAuthenticationConfigId === 'string' &&
      /^[a-z]+-[a-z]+[0-9]+$/.test(backendAuthenticationConfigId) &&
      locationId &&
      !/^[a-z]+-[a-z]+[0-9]+$/.test(locationId) &&
      locationId !== 'global')
  ) {
    const temp = backendAuthenticationConfigId;
    backendAuthenticationConfigId = locationId;
    locationId = temp;
  }

  try {
    const name = `projects/${projectId}/locations/${locationId}/backendAuthenticationConfigs/${backendAuthenticationConfigId}`;

    const request = {
      name,
    };

    const [response] = await client.getBackendAuthenticationConfig(request);
    console.log(`Retrieved BackendAuthenticationConfig: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`BackendAuthenticationConfig resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing resource: ${err.message}`);
    } else {
      console.error(`API call failed: ${err.message}`);
    }
  }
}

module.exports = { getBackendAuthenticationConfig };
// [END networksecurity_v1_networksecurity_backendauthenticationconfig_get]
