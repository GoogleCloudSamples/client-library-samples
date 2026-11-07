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

// [START networksecurity_v1_addressgroupservice_addressgroup_delete]
'use strict';

const networkSecurity = require('@google-cloud/network-security');
const {status} = require('@grpc/grpc-js');

const AddressGroupServiceClient =
  (networkSecurity.v1 && networkSecurity.v1.AddressGroupServiceClient) ||
  networkSecurity.AddressGroupServiceClient ||
  (networkSecurity.v1 && networkSecurity.v1.AddressGroupsClient) ||
  networkSecurity.AddressGroupsClient;

const client = new AddressGroupServiceClient();

/**
 * Deletes a specified AddressGroup resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the AddressGroup is located (for example, 'global' or 'us-central1').
 * @param {string} addressGroupId - The identifier of the AddressGroup to delete (for example, 'example-address-group').
 */
async function deleteAddressGroup(projectId, locationId, addressGroupId) {
  const name = `projects/${projectId}/locations/${locationId}/addressGroups/${addressGroupId}`;

  try {
    const [operation] = await client.deleteAddressGroup({name});
    await operation.promise();

    console.log(`Deleted address group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Address group is currently referenced by a policy and cannot be deleted: ${name}`);
    } else {
      console.error(`Failed to delete address group: ${err.message}`);
    }
  }
}

module.exports = { deleteAddressGroup };
// [END networksecurity_v1_addressgroupservice_addressgroup_delete]
