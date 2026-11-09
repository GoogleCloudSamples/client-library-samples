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

// [START networksecurity_v1_securityprofilegroupservice_securityprofile_update]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const SecurityProfileGroupServiceClient =
  networkSecurity.SecurityProfileGroupServiceClient ||
  networkSecurity.v1?.SecurityProfileGroupServiceClient ||
  networkSecurity.SecurityProfileGroupsClient ||
  networkSecurity.v1?.SecurityProfileGroupsClient;

const client = new SecurityProfileGroupServiceClient();

/**
 * Updates an existing security profile.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, "global").
 * @param {string} securityProfileId - The identifier of the security profile to update.
 */
async function updateSecurityProfile(projectId, locationId, securityProfileId) {
  try {
    const securityProfile = {
      name: `projects/${projectId}/locations/${locationId}/securityProfiles/${securityProfileId}`,
      description: 'Updated description for the security profile',
    };
    const updateMask = {
      paths: ['description'],
    };

    // UpdateSecurityProfile initiates a long-running operation
    const [operation] = await client.updateSecurityProfile({
      securityProfile,
      updateMask,
    });

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Updated security profile: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateSecurityProfile };
// [END networksecurity_v1_securityprofilegroupservice_securityprofile_update]
