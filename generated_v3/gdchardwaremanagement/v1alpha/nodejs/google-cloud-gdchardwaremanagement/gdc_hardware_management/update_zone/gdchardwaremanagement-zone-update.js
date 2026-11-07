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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_update]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Updates an existing Google Distributed Cloud (GDC) Hardware Management zone.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} zoneId - The identifier of the GDC Hardware Management zone to update.
 */
async function updateZone(projectId, locationId, zoneId) {
  try {
    const zone = {
      name: `projects/${projectId}/locations/${locationId}/zones/${zoneId}`,
      displayName: 'Updated Zone Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    // Submit the update request and wait for the long-running operation to complete
    const [operation] = await client.updateZone({
      zone,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Zone updated: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Zone not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC error [code ${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { updateZone };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_zone_update]
