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

// [START gkehub_v1_gkehub_membership_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Retrieves the details of a GKE Hub membership.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the membership (for example, 'global' or 'us-central1').
 * @param {string} membershipId - The client-chosen ID of the Membership to retrieve (for example, 'example-membership'). Must be an RFC 1123 compliant DNS label.
 */
async function getMembership(projectId, locationId, membershipId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/memberships/${membershipId}`;

    const request = {
      name,
    };

    const [response] = await client.getMembership(request);
    console.log(`Membership resource name: ${response.name}`);
    console.log(`Unique ID: ${response.uniqueId}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Membership resource not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when accessing membership.');
    } else {
      console.error(`Error retrieving membership: ${err.message}`);
    }
  }
}

module.exports = { getMembership };
// [END gkehub_v1_gkehub_membership_get]
