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

// [START gkehub_v1_gkehub_fleet_get]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Use the getFleet method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} fleetId - ID of the Fleet (for example, 'example-fleet-id')
 */
async function getFleet(projectId, locationId, fleetId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/fleets/${fleetId}`;
    const request = {
      name,
    };

    const [fleet] = await client.getFleet(request);

    console.log(`Fleet name: ${fleet.name}`);
    console.log(`Fleet display name: ${fleet.displayName}`);
    console.log(`Fleet state: ${fleet.state?.code}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Fleet resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve fleet: ${err.message}`);
    }
  }
}

module.exports = { getFleet };
// [END gkehub_v1_gkehub_fleet_get]
