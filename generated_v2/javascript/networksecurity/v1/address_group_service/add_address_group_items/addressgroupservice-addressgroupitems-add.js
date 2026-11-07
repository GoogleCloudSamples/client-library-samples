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

// [START networksecurity_v1_addressgroupservice_add_address_group_items]
'use strict';

const {AddressGroupServiceClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new AddressGroupServiceClient();

/**
 * Adds items to an address group.
 *
 * @param {string} projectsOrganizationId - ID of the project or organization (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} addressGroupId - ID of the address group (for example, 'example-address-group-id')
 */
async function addAddressGroupItems(projectsOrganizationId, locationId, addressGroupId) {
  try {
    const addressGroup = `projects/${projectsOrganizationId}/locations/${locationId}/addressGroups/${addressGroupId}`;
    const items = '192.0.2.1/32';

    const request = {
      addressGroup,
      items: [items],
    };

    const [operation] = await client.addAddressGroupItems(request);
    const [response] = await operation.promise();

    console.log(`Address group items added successfully: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Address group items already exist: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error adding address group items: ${err.message}`);
    }
  }
}

module.exports = { addAddressGroupItems };
// [END networksecurity_v1_addressgroupservice_add_address_group_items]
