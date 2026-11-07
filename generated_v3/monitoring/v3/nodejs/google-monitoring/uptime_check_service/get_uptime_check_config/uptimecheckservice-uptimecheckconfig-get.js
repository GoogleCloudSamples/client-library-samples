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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
'use strict';

const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Use the getUptimeCheckConfig method
 *
 * @param {string} uptimeCheckConfigId - The server-assigned ID of the Uptime check configuration to retrieve.
 * @param {string} projectId - The Google Cloud project ID where the Uptime check configuration resides.
 */
async function getUptimeCheckConfig(uptimeCheckConfigId, projectId) {
  try {
    const name = `projects/${projectId}/uptimeCheckConfigs/${uptimeCheckConfigId}`;
    const request = {
      name,
    };

    const [uptimeCheckConfig] = await client.getUptimeCheckConfig(request);
    console.log(`Retrieved Uptime check configuration: ${uptimeCheckConfig.displayName}`);
    console.log(`Resource name: ${uptimeCheckConfig.name}`);
    return uptimeCheckConfig;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Uptime check configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve Uptime check configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getUptimeCheckConfig };
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_get]
