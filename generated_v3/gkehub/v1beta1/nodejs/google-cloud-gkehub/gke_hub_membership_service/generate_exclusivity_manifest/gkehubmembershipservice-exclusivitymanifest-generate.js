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

// [START gkehub_v1beta1_gkehubmembershipservice_generate_exclusivity_manifest]
'use strict';

const {GkeHubMembershipServiceClient} = require('@google-cloud/gke-hub').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new GkeHubMembershipServiceClient();

/**
 * Generates an exclusivity manifest for a GKE Hub membership.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} membershipId - ID of the Membership (for example, 'example-membership-id')
 */
async function generateExclusivityManifest(projectId, locationId, membershipId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/memberships/${membershipId}`;
    const request = {
      name,
    };

    const [response] = await client.generateExclusivityManifest(request);

    console.log('CRD manifest:', response.crdManifest);
    console.log('CR manifest:', response.crManifest);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Membership resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else {
      console.error('Request failed with error:', err.message);
    }
  }
}

module.exports = { generateExclusivityManifest };
// [END gkehub_v1beta1_gkehubmembershipservice_generate_exclusivity_manifest]
