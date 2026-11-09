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

// [START gkehub_v1_gkehub_scopes_list]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the listScopes method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listScopes(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [scopes] = await client.listScopes({
      parent,
    });

    console.log(`Scopes in ${parent}:`);
    for (const scope of scopes) {
      console.log(`- Scope: ${scope.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for ${projectId}/${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing ${projectId}/${locationId}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listScopes };
// [END gkehub_v1_gkehub_scopes_list]
