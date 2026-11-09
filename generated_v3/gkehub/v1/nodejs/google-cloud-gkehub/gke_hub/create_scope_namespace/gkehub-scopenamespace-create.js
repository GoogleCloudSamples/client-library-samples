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

// [START gkehub_v1_gkehub_scopenamespace_create]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the createScopeNamespace method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region or location for the Scope (for example, 'global').
 * @param {string} scopeId - The ID of an existing Scope to create the namespace under (for example, 'example-scope-id').
 * @param {string} scopeNamespaceId - Client-chosen ID for the Namespace. Must be an RFC 1123 compliant DNS label consisting of lowercase alphanumeric characters or hyphens, up to 63 characters (for example, 'example-namespace').
 */
async function createScopeNamespace(projectId, locationId, scopeId, scopeNamespaceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/scopes/${scopeId}`;
    const scopeNamespace = {
      scope: parent,
      namespaceLabels: {
        environment: 'production',
      },
    };

    const request = {
      parent,
      scopeNamespaceId,
      scopeNamespace,
    };

    // Fleet Scope Namespace creation is a long-running operation
    const [operation] = await client.createScopeNamespace(request);
    const [response] = await operation.promise();

    console.log(`Scope namespace created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Scope namespace already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent scope not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when creating scope namespace: ${err.message}`);
    } else {
      console.error(`Failed to create scope namespace: ${err.message || err}`);
    }
  }
}

module.exports = { createScopeNamespace };
// [END gkehub_v1_gkehub_scopenamespace_create]
