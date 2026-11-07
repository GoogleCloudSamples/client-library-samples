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

// [START gkehub_v1_gkehub_membershipbinding_create]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Creates a membership binding in GKE Hub.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 * @param {string} membershipBindingId - ID of the MembershipBinding (for example, 'example-membershipbinding-id')
 */
async function createMembershipBinding(projectId, locationId, membershipId, membershipBindingId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/memberships/${membershipId}`;
    const membershipBinding = {};

    const request = {
      parent,
      membershipBindingId,
      membershipBinding,
    };

    // Initiates the long-running operation to create a membership binding
    const [operation] = await client.createMembershipBinding(request);
    const [response] = await operation.promise();

    console.log(`Created membership binding: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Membership binding already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating membership binding: ${err.message}`);
    } else {
      console.error(`Failed to create membership binding: ${err.message}`);
    }
  }
}

module.exports = { createMembershipBinding };
// [END gkehub_v1_gkehub_membershipbinding_create]
