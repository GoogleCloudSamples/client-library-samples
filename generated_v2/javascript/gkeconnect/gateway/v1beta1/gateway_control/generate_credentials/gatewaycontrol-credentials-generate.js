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

// [START connectgateway_v1beta1_gatewaycontrol_generate_credentials]
'use strict';

const {GatewayControlClient} = require('@google-cloud/gke-connect-gateway');
const {status} = require('@grpc/grpc-js');

const client = new GatewayControlClient();

/**
 * Use the generateCredentials method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or global) for the Fleet membership.
 * @param {string} membershipId - The ID of the Fleet membership to generate credentials for.
 */
async function generateCredentials(projectId, locationId, membershipId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/memberships/${membershipId}`;
    const request = {
      name,
    };

    const [response] = await client.generateCredentials(request);
    console.log(`Generated credentials for endpoint: ${response.endpoint}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Membership not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing membership: ${err.message}`);
    } else {
      console.error(`Failed to generate credentials: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { generateCredentials };
// [END connectgateway_v1beta1_gatewaycontrol_generate_credentials]
