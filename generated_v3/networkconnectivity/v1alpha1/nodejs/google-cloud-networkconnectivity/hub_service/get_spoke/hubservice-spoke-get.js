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

// [START networkconnectivity_v1alpha1_hubservice_spoke_get]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the getSpoke method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location/region of the Spoke resource (for example, 'global' or a specific region like 'us-central1').
 * @param {string} spokeId - The unique identifier of the Spoke resource to retrieve.
 */
async function getSpoke(projectId, locationId, spokeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/spokes/${spokeId}`;
    const request = {
      name,
    };

    const [spoke] = await client.getSpoke(request);
    console.log(`Spoke name: ${spoke.name}`);
    console.log(`Spoke state: ${spoke.state}`);
    console.log(`Hub: ${spoke.hub}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Spoke not found: projects/${projectId}/locations/${locationId}/spokes/${spokeId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while retrieving the spoke.');
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSpoke };
// [END networkconnectivity_v1alpha1_hubservice_spoke_get]
