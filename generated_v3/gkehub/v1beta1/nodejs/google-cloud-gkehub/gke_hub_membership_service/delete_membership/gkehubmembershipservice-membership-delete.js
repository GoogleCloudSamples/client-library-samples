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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_delete]
'use strict';

const {GkeHubMembershipServiceClient} = require('@google-cloud/gke-hub').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new GkeHubMembershipServiceClient();

/**
 * Deletes a specified membership.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 */
async function deleteMembership(projectId, locationId, membershipId) {
  try {
    const name = client.membershipPath(projectId, locationId, membershipId);

    const request = {
      name,
    };

    const [operation] = await client.deleteMembership(request);
    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log(`Deleted membership: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting membership: ${err.message}`);
    } else {
      console.error(`Failed to delete membership: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {deleteMembership};
// [END gkehub_v1beta1_gkehubmembershipservice_membership_delete]
