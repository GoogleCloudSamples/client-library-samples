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

// [START gkehub_v1_gkehub_memberships_list]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the listMemberships method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listMemberships(projectId) {
  try {
    const parent = `projects/${projectId}/locations/global`;

    const [memberships] = await client.listMemberships({
      parent,
    });

    console.log(`Memberships in ${parent}:`);
    for (const membership of memberships) {
      console.log(`- ${membership.name}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for the provided Google Cloud resource.');
    } else if (err.code === status.NOT_FOUND) {
      console.error('The specified parent location was not found.');
    } else {
      console.error('An error occurred during GKE Hub request execution:', err.message);
    }
  }
}

module.exports = { listMemberships };
// [END gkehub_v1_gkehub_memberships_list]
