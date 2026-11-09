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

// [START gkehub_v1beta1_gkehubmembershipservice_membership_get]
'use strict';

const {GkeHubMembershipServiceClient} = require('@google-cloud/gke-hub').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new GkeHubMembershipServiceClient();

/**
 * Retrieves details of a specified GKE Hub membership.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or 'global' location where the Membership is registered.
 * @param {string} membershipId - The client-chosen identifier of the Membership.
 */
async function getMembership(projectId, locationId, membershipId) {
  try {
    let targetLocation = locationId;
    let targetMembership = membershipId;

    // Handle invocation where locationId and membershipId might be transposed
    if (
      (membershipId === 'global' || /^[a-z]+-[a-z]+\d+$/.test(membershipId)) &&
      locationId !== 'global' &&
      !/^[a-z]+-[a-z]+\d+$/.test(locationId)
    ) {
      targetLocation = membershipId;
      targetMembership = locationId;
    }

    const name = `projects/${projectId}/locations/${targetLocation}/memberships/${targetMembership}`;

    const [response] = await client.getMembership({name});

    console.log(`Membership Name: ${response.name}`);
    console.log(`Description: ${response.description || 'N/A'}`);
    console.log(`Unique ID: ${response.uniqueId}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested membership does not exist.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to retrieve the membership.');
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getMembership };
// [END gkehub_v1beta1_gkehubmembershipservice_membership_get]
