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

// [START gkehub_v1_gkehub_scope_create]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the createScope method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 */
async function createScope(projectId, locationId, scopeId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const scope = {};

    const request = {
      parent,
      scopeId,
      scope,
    };

    const [operation] = await client.createScope(request);
    const [response] = await operation.promise();

    console.log(`Created Scope: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Scope '${scopeId}' already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when creating scope '${scopeId}'.`);
    } else {
      console.error(`Failed to create scope: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createScope };
// [END gkehub_v1_gkehub_scope_create]
