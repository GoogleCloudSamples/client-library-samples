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

// [START networkconnectivity_v1beta_hubservice_spoke_create]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the createSpoke method
 *
 * @param {string} spokeId - The unique identifier for the spoke to create.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or 'global') where the spoke is created.
 * @param {string} hubId - The ID of the Network Connectivity Center hub to attach the spoke to.
 * @param {string} networkId - The ID or name of the VPC network to attach to the spoke (for example, 'default').
 */
async function createSpoke(spokeId, projectId, locationId, hubId, networkId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const spoke = {
      hub: `projects/${projectId}/locations/global/hubs/${hubId}`,
      linkedVpcNetwork: {
        uri: `projects/${projectId}/global/networks/${networkId}`,
      },
    };

    const request = {
      parent,
      spokeId,
      spoke,
    };

    const [operation] = await client.createSpoke(request);
    const [response] = await operation.promise();

    console.log(`Created spoke: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Spoke already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create spoke: ${err.message}`);
    }
  }
}

module.exports = { createSpoke };
// [END networkconnectivity_v1beta_hubservice_spoke_create]
