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

// [START gkehub_v1_gkehub_scopenamespace_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Updates a fleet scope namespace.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region (for example, 'global') of the fleet scope namespace.
 * @param {string} scopeId - The client-assigned ID of the parent Scope.
 * @param {string} namespaceId - The client-assigned ID of the fleet Namespace to update.
 */
async function updateScopeNamespace(projectId, locationId, scopeId, namespaceId) {
  try {
    const scopeNamespace = {
      name: `projects/${projectId}/locations/${locationId}/scopes/${scopeId}/namespaces/${namespaceId}`,
      labels: {
        environment: 'example-environment',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const [operation] = await client.updateScopeNamespace({
      scopeNamespace,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated scope namespace: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope namespace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error updating scope namespace: ${err.message}`);
    }
  }
}

module.exports = { updateScopeNamespace };
// [END gkehub_v1_gkehub_scopenamespace_update]
