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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_update]
'use strict';

const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Use the updateUptimeCheckConfig method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Uptime check configuration.
 * @param {string} uptimeCheckConfigId - The server-generated ID of the Uptime check configuration to update.
 */
async function updateUptimeCheckConfig(projectId, uptimeCheckConfigId) {
  try {
    const uptimeCheckConfig = {
      name: `projects/${projectId}/uptimeCheckConfigs/${uptimeCheckConfigId}`,
      displayName: 'Updated Uptime Check',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      uptimeCheckConfig,
      updateMask,
    };

    // Update the Uptime check configuration with the specified field mask
    const [response] = await client.updateUptimeCheckConfig(request);
    console.log(`Updated Uptime check configuration: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Uptime check configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateUptimeCheckConfig };
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_update]
