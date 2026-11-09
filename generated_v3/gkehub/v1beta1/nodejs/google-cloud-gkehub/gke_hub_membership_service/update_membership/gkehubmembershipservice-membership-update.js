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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_update]
'use strict';

const {v1beta1} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.GkeHubMembershipServiceClient();

/**
 * Updates a GKE Hub membership.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} membershipId - Membership ID (for example, 'example-membership-id').
 */
async function updateMembership(projectId, membershipId) {
  try {
    const resource = {
      labels: {
        env: 'production',
      },
    };
    const name = `projects/${projectId}/locations/global/memberships/${membershipId}`;
    const updateMask = {
      paths: ['labels'],
    };

    const [operation] = await client.updateMembership({
      name,
      updateMask,
      resource,
    });

    const [response] = await operation.promise();
    console.log(`Updated membership: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { updateMembership };
// [END gkehub_v1beta1_gkehubmembershipservice_membership_update]
