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

// [START networksecurity_v1_addressgroupservice_addressgroup_update]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const AddressGroupServiceClient =
  networkSecurity.v1?.AddressGroupServiceClient ||
  networkSecurity.AddressGroupServiceClient ||
  networkSecurity.v1?.AddressGroupsClient ||
  networkSecurity.AddressGroupsClient;

const client = new AddressGroupServiceClient();

/**
 * Updates an address group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location for the address group.
 * @param {string} addressGroupId - The ID of the address group to update.
 */
async function updateAddressGroup(projectId, locationId, addressGroupId) {
  try {
    const addressGroup = {
      name: `projects/${projectId}/locations/${locationId}/addressGroups/${addressGroupId}`,
      description: 'Updated description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      addressGroup,
      updateMask,
    };

    const [operation] = await client.updateAddressGroup(request);
    const [response] = await operation.promise();

    console.log(`Updated address group: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateAddressGroup };
// [END networksecurity_v1_addressgroupservice_addressgroup_update]
