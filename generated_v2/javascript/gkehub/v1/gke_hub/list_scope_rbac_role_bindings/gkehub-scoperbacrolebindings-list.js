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

// [START gkehub_v1_gkehub_scoperbacrolebindings_list]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Lists Scope RBAC Role Bindings.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 */
async function listScopeRbacRoleBindings(locationId, projectId, scopeId) {
  try {
    let resolvedProjectId = projectId;
    let resolvedLocationId = locationId;

    if (resolvedLocationId && !resolvedProjectId) {
      resolvedProjectId = resolvedLocationId;
      resolvedLocationId = 'global';
    } else if (
      resolvedProjectId === 'global' &&
      resolvedLocationId &&
      resolvedLocationId !== 'global'
    ) {
      resolvedProjectId = resolvedLocationId;
      resolvedLocationId = 'global';
    }

    if (!resolvedProjectId) {
      resolvedProjectId = await client.getProjectId();
    }
    if (!resolvedLocationId) {
      resolvedLocationId = 'global';
    }

    const parent = `projects/${resolvedProjectId}/locations/${resolvedLocationId}/scopes/${scopeId}`;
    const request = {
      parent,
    };

    const [response] = await client.listScopeRBACRoleBindings(request);
    const roleBindings = Array.isArray(response)
      ? response
      : (response?.rbacRoleBindings ?? response?.scopeRbacRoleBindings ?? []);

    if (roleBindings.length === 0) {
      console.log('No Scope RBAC Role Bindings found.');
    }

    for (const binding of roleBindings) {
      console.log(`RBAC Role Binding: ${binding.name}`);
      console.log(`Role: ${binding.role?.predefinedRole}`);
      console.log(`User: ${binding.user}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing scope: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listScopeRbacRoleBindings };
// [END gkehub_v1_gkehub_scoperbacrolebindings_list]
