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

// [START networksecurity_v1_mirroring_mirroringendpointgroup_get]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Retrieves details of a network security mirroring endpoint group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location of the endpoint group (for example, 'global').
 * @param {string} mirroringEndpointGroupId - The identifier of the mirroring endpoint group.
 */
async function getMirroringEndpointGroup(projectId, locationId, mirroringEndpointGroupId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/mirroringEndpointGroups/${mirroringEndpointGroupId}`;

    const [endpointGroup] = await client.getMirroringEndpointGroup({
      name,
    });

    console.log(`Endpoint Group Name: ${endpointGroup.name}`);
    console.log(`State: ${endpointGroup.state}`);
    console.log(`Create Time: ${JSON.stringify(endpointGroup.createTime)}`);
    return endpointGroup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Mirroring endpoint group not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing resource: ${err.message}`);
    } else {
      console.error(`Request failed with status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getMirroringEndpointGroup};
// [END networksecurity_v1_mirroring_mirroringendpointgroup_get]
