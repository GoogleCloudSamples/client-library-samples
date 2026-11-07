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

// [START gkehub_v1_gkehub_fleet_update]
'use strict';

const {GkeHubClient} = require('@google-cloud/gke-hub');
const {status} = require('@grpc/grpc-js');

const client = new GkeHubClient();

/**
 * Updates an existing Fleet resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global').
 * @param {string} fleetId - The identifier of the Fleet resource, typically 'default'.
 */
async function updateFleet(projectId, locationId, fleetId) {
  try {
    const fleet = {
      name: `projects/${projectId}/locations/${locationId}/fleets/${fleetId}`,
      displayName: 'Updated Production Fleet',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateFleet({
      fleet,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Fleet updated: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Fleet resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateFleet };
// [END gkehub_v1_gkehub_fleet_update]
