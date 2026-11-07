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

// [START maintenance_v1_maintenance_resourcemaintenance_get]
'use strict';

const {MaintenanceClient} = require('@google-cloud/maintenance-api');
const {status} = require('@grpc/grpc-js');

const client = new MaintenanceClient();

/**
 * Use the getResourceMaintenance method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID (e.g., 'us-central1' or 'global').
 * @param {string} resourceMaintenanceId - The server-generated ID of the resource maintenance event, obtained from a previous list or summary query.
 */
async function getResourceMaintenance(projectId, locationId, resourceMaintenanceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/resourceMaintenances/${resourceMaintenanceId}`;

    const request = {
      name,
    };

    const [response] = await client.getResourceMaintenance(request);

    console.log(`Resource maintenance name: ${response.name}`);
    console.log(`Maintenance state: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource maintenance event not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing resource maintenance: ${err.message}`);
    } else {
      console.error(`Failed to get resource maintenance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getResourceMaintenance };
// [END maintenance_v1_maintenance_resourcemaintenance_get]
