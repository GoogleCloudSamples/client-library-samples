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

// [START networksecurity_v1_addressgroupservice_addressgroup_get]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const AddressGroupServiceClient =
  networkSecurity.AddressGroupServiceClient ||
  networkSecurity.v1.AddressGroupServiceClient;

const client = new AddressGroupServiceClient();

/**
 * Retrieves the details of an existing address group.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} addressGroupId ID of the AddressGroup (for example, 'example-addressgroup-id')
 */
async function getAddressGroup(projectId, locationId, addressGroupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/addressGroups/${addressGroupId}`;

    const request = {
      name,
    };

    const [addressGroup] = await client.getAddressGroup(request);

    console.log(`Address Group name: ${addressGroup.name}`);
    console.log(`Capacity: ${addressGroup.capacity}`);
    console.log(`Type: ${addressGroup.type}`);

    return addressGroup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing address group: ${err.message}`);
    } else {
      console.error(`Failed to retrieve address group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getAddressGroup};
// [END networksecurity_v1_addressgroupservice_addressgroup_get]
