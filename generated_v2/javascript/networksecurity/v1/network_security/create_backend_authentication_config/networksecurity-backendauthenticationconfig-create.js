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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_create]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const v1Client = networkSecurity.v1 && networkSecurity.v1.NetworkSecurityClient;
const v1beta1Client = networkSecurity.v1beta1 && networkSecurity.v1beta1.NetworkSecurityClient;

// BackendAuthenticationConfig is supported in v1beta1 and newer v1 releases.
const NetworkSecurityClient =
  v1Client && v1Client.prototype && typeof v1Client.prototype.createBackendAuthenticationConfig === 'function'
    ? v1Client
    : (v1beta1Client || networkSecurity.NetworkSecurityClient);

const client = new NetworkSecurityClient();

/**
 * Creates a BackendAuthenticationConfig resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location or region where the BackendAuthenticationConfig is created (for example, 'global' or 'us-central1').
 * @param {string} backendAuthenticationConfigId - The caller-chosen ID of the BackendAuthenticationConfig to create (for example, 'example-backend-auth-config').
 */
async function createBackendAuthenticationConfig(projectId, locationId, backendAuthenticationConfigId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const backendAuthenticationConfig = {
      description: 'Example backend authentication configuration',
      wellKnownRoots: 'PUBLIC_ROOTS',
    };

    const [operation] = await client.createBackendAuthenticationConfig({
      parent,
      backendAuthenticationConfigId,
      backendAuthenticationConfig,
    });

    const [response] = await operation.promise();
    console.log(`Backend authentication config created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backend authentication config already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`gRPC error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createBackendAuthenticationConfig };
// [END networksecurity_v1_networksecurity_backendauthenticationconfig_create]
