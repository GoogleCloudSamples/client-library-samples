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

// [START gkehub_v1_gkehub_membershipbinding_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getMembershipBinding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 * @param {string} bindingId - ID of the Binding (for example, 'example-binding-id')
 */
async function getMembershipBinding(projectId, locationId, membershipId, bindingId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/memberships/${membershipId}/bindings/${bindingId}`;

    const request = {
      name,
    };

    const [response] = await client.getMembershipBinding(request);

    console.log(`Membership binding name: ${response.name}`);
    console.log(`Scope: ${response.scope}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership binding not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing membership binding: ${err.message}`);
    } else {
      console.error(`Failed to get membership binding: ${err.message}`);
    }
  }
}

module.exports = { getMembershipBinding };
// [END gkehub_v1_gkehub_membershipbinding_get]
