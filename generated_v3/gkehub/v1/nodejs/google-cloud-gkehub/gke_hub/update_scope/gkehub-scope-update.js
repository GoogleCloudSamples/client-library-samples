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

// [START gkehub_v1_gkehub_scope_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the updateScope method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the GKE Hub scope.
 * @param {string} locationId - The location of the GKE Hub scope, typically 'global'.
 * @param {string} scopeId - The identifier of the existing GKE Hub scope to update.
 */
async function updateScope(projectId, locationId, scopeId) {
  try {
    const updateMask = {
      paths: ['labels'],
    };
    const scope = {
      name: `projects/${projectId}/locations/${locationId}/scopes/${scopeId}`,
      labels: {
        environment: 'production',
      },
    };

    const request = {
      scope,
      updateMask,
    };

    const [operation] = await client.updateScope(request);
    const [response] = await operation.promise();

    console.log(`Successfully updated scope: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update scope: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateScope };
// [END gkehub_v1_gkehub_scope_update]
