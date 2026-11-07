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

// [START gkehub_v1_gkehub_membership_delete]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the deleteMembership method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 */
async function deleteMembership(projectId, locationId, membershipId) {
  try {
    // Construct the resource name for the target membership
    const name = client.membershipPath(projectId, locationId, membershipId);

    // Initialize the long-running operation to delete the membership
    const [operation] = await client.deleteMembership({name});

    // Wait for the long-running operation to complete
    await operation.promise();

    console.log(`Deleted membership: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete membership: ${err.message}`);
    }
  }
}

module.exports = { deleteMembership };
// [END gkehub_v1_gkehub_membership_delete]
