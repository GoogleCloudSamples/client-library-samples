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

// [START networksecurity_v1_addressgroupservice_addressgroupreferences_list]
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
 * Lists references to an address group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} addressGroupId - ID of the AddressGroup (for example, 'example-addressgroup-id')
 */
async function listAddressGroupReferences(projectId, locationId, addressGroupId) {
  try {
    const addressGroup = `projects/${projectId}/locations/${locationId}/addressGroups/${addressGroupId}`;
    const request = {
      addressGroup,
    };

    const [references] = await client.listAddressGroupReferences(request);
    console.log(`Retrieved ${references.length} address group reference(s):`);
    for (const reference of references) {
      console.log(`Security policy: ${reference.securityPolicy}`);
      console.log(`Rule priority: ${reference.rulePriority}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Address group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listAddressGroupReferences };
// [END networksecurity_v1_addressgroupservice_addressgroupreferences_list]
