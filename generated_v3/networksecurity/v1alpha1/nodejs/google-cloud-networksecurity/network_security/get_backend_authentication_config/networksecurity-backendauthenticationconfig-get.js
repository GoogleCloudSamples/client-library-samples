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

// [START networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_get]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha1.NetworkSecurityClient();

/**
 * Retrieves a backend authentication config.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backendAuthenticationConfigId - ID of the BackendAuthenticationConfig (for example, 'example-backendauthenticationconfig-id')
 */
async function getBackendAuthenticationConfig(projectId, locationId, backendAuthenticationConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backendAuthenticationConfigs/${backendAuthenticationConfigId}`;

    const request = {
      name,
    };

    const [response] = await client.getBackendAuthenticationConfig(request);
    console.log(`Retrieved BackendAuthenticationConfig: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backend authentication config not found: ${err.message}`);
    } else {
      console.error(`API error retrieving backend authentication config: ${err.message}`);
    }
  }
}

module.exports = { getBackendAuthenticationConfig };
// [END networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_get]
