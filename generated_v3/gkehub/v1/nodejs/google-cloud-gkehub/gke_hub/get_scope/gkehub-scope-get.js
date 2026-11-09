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

// [START gkehub_v1_gkehub_scope_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getScope method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location for the Scope, typically 'global'.
 * @param {string} scopeId - The client-assigned ID of the Scope to retrieve.
 */
async function getScope(projectId, locationId, scopeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/scopes/${scopeId}`;

    const request = {
      name,
    };

    const [scope] = await client.getScope(request);

    console.log(`Scope name: ${scope.name}`);
    console.log(`Scope state: ${scope.state?.code || 'STATE_UNSPECIFIED'}`);
    return scope;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Scope not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to access scope.');
    } else {
      console.error(`API error retrieving scope: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getScope };
// [END gkehub_v1_gkehub_scope_get]
