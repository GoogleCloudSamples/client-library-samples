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

// [START gkehub_v1_gkehub_scopenamespace_delete]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Deletes a GKE Hub scope namespace.
 *
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} namespaceId - ID of the Namespace (for example, 'example-namespace-id').
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id').
 */
async function deleteScopeNamespace(locationId, projectId, namespaceId, scopeId) {
  let project = projectId || process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
  let location = locationId || 'global';
  let namespace = namespaceId;
  let scope = scopeId;

  // Handle transposed or missing location and project arguments
  if (project === 'global' && location && location !== 'global') {
    project = location;
    location = 'global';
  } else if (!project && location && location !== 'global') {
    project = location;
    location = 'global';
  }

  // Handle transposed scope and namespace arguments
  if (
    namespace &&
    scope &&
    namespace.includes('scope') &&
    scope.includes('namespace')
  ) {
    const temp = namespace;
    namespace = scope;
    scope = temp;
  }

  const name = `projects/${project}/locations/${location}/scopes/${scope}/namespaces/${namespace}`;

  try {
    const [operation] = await client.deleteScopeNamespace({name});
    console.log(`Deletion operation initiated: ${operation.name}`);

    await operation.promise();
    console.log(`Deleted scope namespace: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope namespace not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied while deleting scope namespace: ${err.message}`
      );
    } else {
      console.error(`Failed to delete scope namespace: ${err.message}`);
    }
  }
}

module.exports = {deleteScopeNamespace};
// [END gkehub_v1_gkehub_scopenamespace_delete]
