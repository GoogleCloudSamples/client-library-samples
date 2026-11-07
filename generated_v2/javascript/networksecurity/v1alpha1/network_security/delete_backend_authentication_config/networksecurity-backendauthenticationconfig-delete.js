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

// [START networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_delete]
'use strict';

const {NetworkSecurityClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new NetworkSecurityClient();

/**
 * Deletes a BackendAuthenticationConfig resource.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud region (for example, 'us-central1').
 * @param {string} backendAuthenticationConfigId - Identifier of the backend authentication config (for example, 'example-backend-auth-config').
 */
async function deleteBackendAuthenticationConfig(projectId, locationId, backendAuthenticationConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backendAuthenticationConfigs/${backendAuthenticationConfigId}`;

    // Initiates deletion and waits for the long-running operation to complete.
    const [operation] = await client.deleteBackendAuthenticationConfig({
      name,
    });
    await operation.promise();

    console.log(`Deleted backend authentication config: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backend authentication config not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { deleteBackendAuthenticationConfig };
// [END networksecurity_v1alpha1_networksecurity_backendauthenticationconfig_delete]
