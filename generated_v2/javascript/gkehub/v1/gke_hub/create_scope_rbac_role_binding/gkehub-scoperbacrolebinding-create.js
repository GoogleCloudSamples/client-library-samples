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

// [START gkehub_v1_gkehub_scoperbacrolebinding_create]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Creates a Scope RBAC Role Binding.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 * @param {string} rbacrolebindingId - ID of the RBAC role binding (for example, 'example-rbacrolebinding-id')
 */
async function createScopeRbacRoleBinding(projectId, locationId, scopeId, rbacrolebindingId) {
  try {
    const parent = client.scopePath(projectId, locationId, scopeId);
    const rbacrolebinding = {
      user: 'example-user@example.com',
      role: {
        predefinedRole: 'ADMIN',
      },
    };

    const request = {
      parent,
      rbacrolebindingId,
      rbacrolebinding,
    };

    const [response] = await client.createScopeRBACRoleBinding(request);

    console.log(`Created Scope RBAC Role Binding: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Scope RBAC Role Binding already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Scope or parent resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

module.exports = { createScopeRbacRoleBinding };
// [END gkehub_v1_gkehub_scoperbacrolebinding_create]
