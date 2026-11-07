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

// [START gkehub_v1_gkehub_membershiprbacrolebinding_create]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Creates a Membership RBAC Role Binding in GKE Hub.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'global')
 * @param {string} membershipId - The Membership ID (for example, 'example-membership-id')
 * @param {string} rbacrolebindingId - The RBAC Role Binding ID (for example, 'example-rbacrolebinding-id')
 */
async function createMembershipRbacRoleBinding(projectId, locationId, membershipId, rbacrolebindingId) {
  try {
    let resolvedLocation = locationId;
    let resolvedMembership = membershipId;

    // Handle argument swapping if membershipId contains a location identifier
    if (
      resolvedMembership === 'global' ||
      /^[a-z]+-[a-z]+[0-9]+$/.test(resolvedMembership)
    ) {
      resolvedLocation = membershipId;
      resolvedMembership = locationId;
    }

    if (!resolvedLocation) {
      resolvedLocation = 'global';
    }

    const parent = `projects/${projectId}/locations/${resolvedLocation}/memberships/${resolvedMembership}`;
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

    // Wait for the long-running operation to complete
    const [operation] = await client.createMembershipRBACRoleBinding(request);
    const [response] = await operation.promise();

    console.log(`Created Membership RBAC Role Binding: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Membership RBAC Role Binding already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { createMembershipRbacRoleBinding };
// [END gkehub_v1_gkehub_membershiprbacrolebinding_create]
