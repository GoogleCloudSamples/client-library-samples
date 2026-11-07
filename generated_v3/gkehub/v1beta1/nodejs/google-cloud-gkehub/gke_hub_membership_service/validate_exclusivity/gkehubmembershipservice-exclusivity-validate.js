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

// [START gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
'use strict';

const {v1beta1} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.GkeHubMembershipServiceClient();

/**
 * Validates the exclusivity of a cluster before creating a GKE Hub membership.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the GKE Hub service (for example, 'global' or 'us-central1').
 * @param {string} intendedMembership - The caller-chosen intended membership resource ID under the parent to validate prior to creation (for example, 'example-membership').
 */
async function validateExclusivity(projectId, locationId, intendedMembership) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
      crManifest: '',
      intendedMembership,
    };

    const [response] = await client.validateExclusivity(request);
    console.log(`Validation status code: ${response.status?.code ?? 0}`);
    if (response.status?.message) {
      console.log(`Validation status message: ${response.status.message}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error('Membership already exists:', err.message);
    } else {
      console.error('Validation request failed:', err.message);
    }
  }
}

module.exports = { validateExclusivity };
// [END gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
