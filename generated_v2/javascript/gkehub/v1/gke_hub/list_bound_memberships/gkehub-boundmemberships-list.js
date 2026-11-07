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

// [START gkehub_v1_gkehub_boundmemberships_list]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Lists bound memberships for a Fleet scope in GKE Hub.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} scopeId - ID of the Scope (for example, 'example-scope-id')
 */
async function listBoundMemberships(projectId, scopeId) {
  try {
    // Construct the scope resource path from project ID and scope ID
    const scopeName = `projects/${projectId}/locations/global/scopes/${scopeId}`;

    const request = {
      scopeName,
    };

    const [response] = await client.listBoundMemberships(request);

    if (response.length === 0) {
      console.log(`No bound memberships found for scope ${scopeId}.`);
      return;
    }

    console.log(`Bound memberships for scope ${scopeId}:`);
    for (const membership of response) {
      console.log(`- ${membership.membership || membership.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Scope not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error (${err.code}): ${err.message || err}`);
    }
  }
}

module.exports = { listBoundMemberships };
// [END gkehub_v1_gkehub_boundmemberships_list]
