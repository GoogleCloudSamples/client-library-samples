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

// [START networkconnectivity_v1beta_hubservice_spoke_update]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the updateSpoke method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the spoke.
 * @param {string} locationId - The location/region of the spoke, or 'global' if applicable.
 * @param {string} spokeId - The identifier of the spoke to update.
 */
async function updateSpoke(projectId, locationId, spokeId) {
  try {
    const spoke = {
      name: `projects/${projectId}/locations/${locationId}/spokes/${spokeId}`,
      description: 'Updated spoke description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateSpoke({
      spoke,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated spoke: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Spoke not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update spoke: ${err.message}`);
    }
  }
}

module.exports = { updateSpoke };
// [END networkconnectivity_v1beta_hubservice_spoke_update]
