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

// [START networksecurity_v1alpha1_organizationsecurityprofilegroupservice_securityprofile_delete]
'use strict';

const {v1alpha1} = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const {OrganizationSecurityProfileGroupServiceClient} = v1alpha1;
const client = new OrganizationSecurityProfileGroupServiceClient();

/**
 * Deletes a security profile.
 *
 * @param {string} projectsOrganizationId - ID of the project or organization (for example, 'example-organization-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} securityProfileId - ID of the SecurityProfile (for example, 'example-securityprofile-id')
 */
async function deleteSecurityProfile(projectsOrganizationId, locationId, securityProfileId) {
  try {
    const resourcePrefix = projectsOrganizationId.includes('/')
      ? projectsOrganizationId
      : `organizations/${projectsOrganizationId}`;
    const name = `${resourcePrefix}/locations/${locationId}/securityProfiles/${securityProfileId}`;

    // Initiates the long-running operation to delete the security profile
    const [operation] = await client.deleteSecurityProfile({name});

    // Waits for the deletion operation to complete
    await operation.promise();

    console.log(`Deleted security profile: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Security profile not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteSecurityProfile };
// [END networksecurity_v1alpha1_organizationsecurityprofilegroupservice_securityprofile_delete]
