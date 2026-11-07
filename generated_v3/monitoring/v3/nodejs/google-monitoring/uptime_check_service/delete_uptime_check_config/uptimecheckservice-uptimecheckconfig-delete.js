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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_delete]
'use strict';

const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Use the deleteUptimeCheckConfig method
 *
 * @param {string} uptimeCheckConfigId - The identifier of the Uptime check configuration to delete (for example, 'example-uptime-check-config-id').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteUptimeCheckConfig(uptimeCheckConfigId, projectId) {
  try {
    const name = `projects/${projectId}/uptimeCheckConfigs/${uptimeCheckConfigId}`;
    const request = {
      name,
    };

    await client.deleteUptimeCheckConfig(request);
    console.log(`Deleted Uptime check configuration: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Uptime check configuration not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot delete Uptime check configuration with active dependencies: ${err.message}`);
    } else {
      console.error(`Failed to delete Uptime check configuration: ${err.message}`);
    }
  }
}

module.exports = { deleteUptimeCheckConfig };
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_delete]
