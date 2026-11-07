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

// [START gkehub_v1_gkehub_membershipbinding_delete]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the deleteMembershipBinding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 * @param {string} bindingId - ID of the Binding (for example, 'example-binding-id')
 */
async function deleteMembershipBinding(projectId, locationId, membershipId, bindingId) {
  try {
    const name = client.membershipBindingPath(
      projectId,
      locationId,
      membershipId,
      bindingId
    );

    const [operation] = await client.deleteMembershipBinding({name});
    await operation.promise();

    console.log(`Successfully deleted membership binding: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified membership binding does not exist: ${err.message}`);
    } else {
      console.error(`Failed to delete membership binding: ${err.message}`);
    }
  }
}

module.exports = { deleteMembershipBinding };
// [END gkehub_v1_gkehub_membershipbinding_delete]
