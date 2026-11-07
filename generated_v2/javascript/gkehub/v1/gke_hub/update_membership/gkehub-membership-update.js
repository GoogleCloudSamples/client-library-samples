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

// [START gkehub_v1_gkehub_membership_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the updateMembership method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 */
async function updateMembership(projectId, locationId, membershipId) {
  try {
    const name = client.membershipPath(projectId, locationId, membershipId);
    const resource = {
      labels: {
        environment: 'production',
      },
    };
    const updateMask = {
      paths: ['labels'],
    };

    const request = {
      name,
      resource,
      updateMask,
    };

    const [operation] = await client.updateMembership(request);
    const [response] = await operation.promise();

    console.log(`Updated membership: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error updating membership: ${err.message}`);
    }
  }
}

module.exports = { updateMembership };
// [END gkehub_v1_gkehub_membership_update]
