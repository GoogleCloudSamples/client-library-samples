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

// [START maintenance_v1_maintenance_summarize_maintenances]
'use strict';

const {MaintenanceClient} = require('@google-cloud/maintenance-api');
const {status} = require('@grpc/grpc-js');

const client = new MaintenanceClient();

/**
 * Summarizes maintenances for a given location.
 *
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function summarizeMaintenances(locationId) {
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [response] = await client.summarizeMaintenances(request);
    console.log(`Retrieved ${response.length} maintenance summaries.`);
    for (const summary of response) {
      console.log(`- ${summary.maintenanceName} (${summary.category})`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Maintenance resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing maintenance resource: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = {summarizeMaintenances};
// [END maintenance_v1_maintenance_summarize_maintenances]
