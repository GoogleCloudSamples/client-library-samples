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

// [START gkehub_v1_gkehub_scopenamespace_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getScopeNamespace method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 * @param {string} scopeId - The ID of the Scope containing the namespace (for example, 'example-scope').
 * @param {string} namespaceId - The ID of the Fleet Namespace to retrieve (for example, 'example-namespace').
 */
async function getScopeNamespace(projectId, locationId, scopeId, namespaceId) {
  const name = `projects/${projectId}/locations/${locationId}/scopes/${scopeId}/namespaces/${namespaceId}`;

  try {
    const request = {
      name,
    };

    const [scopeNamespace] = await client.getScopeNamespace(request);

    console.log(`Retrieved Scope Namespace: ${scopeNamespace.name}`);
    console.log(`Creation time: ${scopeNamespace.createTime?.seconds}`);
    console.log(`State: ${scopeNamespace.state?.code}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope namespace not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource: ${name}`);
    } else if (err.code) {
      console.error(`Google API RPC error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getScopeNamespace };
// [END gkehub_v1_gkehub_scopenamespace_get]
