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

// [START networksecurity_v1_organizationaddressgroupservice_addressgroup_create]
'use strict';

const {OrganizationAddressGroupServiceClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new OrganizationAddressGroupServiceClient();

/**
 * Creates an address group in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} addressGroupId - ID of the AddressGroup (for example, 'example-addressgroup-id')
 */
async function createAddressGroup(projectId, locationId, addressGroupId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const addressGroup = {
      type: 'IPV4',
      capacity: 100,
      items: ['10.0.0.0/24'],
      description: 'Example address group',
    };

    const [operation] = await client.createAddressGroup({
      parent,
      addressGroupId,
      addressGroup,
    });
    const [response] = await operation.promise();

    console.log(`Created address group: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Address group already exists: ${err.message}`);
    } else {
      console.error(`Error creating address group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAddressGroup };
// [END networksecurity_v1_organizationaddressgroupservice_addressgroup_create]
