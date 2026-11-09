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

// [START gkehub_v1_gkehub_scoperbacrolebinding_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getScopeRBACRoleBinding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 * @param {string} rbacrolebindingId - ID of the Rbacrolebinding (for example, 'example-rbacrolebinding-id')
 */
async function getScopeRbacRoleBinding(projectId, locationId, scopeId, rbacrolebindingId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/scopes/${scopeId}/rbacrolebindings/${rbacrolebindingId}`;

    const [response] = await client.getScopeRBACRoleBinding({
      name,
    });

    console.log(`Retrieved Scope RBAC Role Binding: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope RBAC Role Binding not found: ${err.message}`);
    } else {
      console.error(`API error retrieving Scope RBAC Role Binding: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getScopeRbacRoleBinding };
// [END gkehub_v1_gkehub_scoperbacrolebinding_get]
