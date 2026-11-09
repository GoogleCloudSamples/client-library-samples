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

// [START networksecurity_v1_addressgroupservice_remove_address_group_items]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const AddressGroupServiceClient =
  networkSecurity.AddressGroupServiceClient ||
  networkSecurity.v1.AddressGroupServiceClient;

const client = new AddressGroupServiceClient();

/**
 * Removes items from an AddressGroup.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} addressGroupId - ID of the AddressGroup (for example, 'example-addressgroup-id').
 */
async function removeAddressGroupItems(projectId, locationId, addressGroupId) {
  try {
    const items = ['10.0.0.1/32'];
    const addressGroup = `projects/${projectId}/locations/${locationId}/addressGroups/${addressGroupId}`;

    const request = {
      addressGroup,
      items,
    };

    // RemoveAddressGroupItems initiates a long-running operation.
    const [operation] = await client.removeAddressGroupItems(request);
    const [response] = await operation.promise();

    console.log(`Items successfully removed from address group: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { removeAddressGroupItems };
// [END networksecurity_v1_addressgroupservice_remove_address_group_items]
