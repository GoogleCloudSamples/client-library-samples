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

// [START gkehub_v1_gkehub_scope_delete]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the deleteScope method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 */
async function deleteScope(projectId, locationId, scopeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/scopes/${scopeId}`;

    const [operation] = await client.deleteScope({name});
    await operation.promise();

    console.log(`Deleted scope: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error deleting scope: ${err.message}`);
    }
  }
}

module.exports = { deleteScope };
// [END gkehub_v1_gkehub_scope_delete]
