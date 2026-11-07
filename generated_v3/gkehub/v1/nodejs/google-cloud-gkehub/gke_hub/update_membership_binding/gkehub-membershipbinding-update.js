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

// [START gkehub_v1_gkehub_membershipbinding_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the updateMembershipBinding method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (e.g., 'global' or a region) for the membership.
 * @param {string} membershipId - The caller-chosen ID of the Membership resource.
 * @param {string} membershipBindingId - The caller-chosen ID of the MembershipBinding resource to update.
 */
async function updateMembershipBinding(projectId, locationId, membershipId, membershipBindingId) {
  try {
    const updateMask = {
      paths: ['labels'],
    };
    const membershipBinding = {
      name: `projects/${projectId}/locations/${locationId}/memberships/${membershipId}/bindings/${membershipBindingId}`,
      labels: {
        env: 'test',
      },
    };

    const [operation] = await client.updateMembershipBinding({
      membershipBinding,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated membership binding: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership binding not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateMembershipBinding };
// [END gkehub_v1_gkehub_membershipbinding_update]
