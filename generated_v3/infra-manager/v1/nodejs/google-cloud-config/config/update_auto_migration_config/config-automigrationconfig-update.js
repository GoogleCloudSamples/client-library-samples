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

// [START infra-manager_v1_config_automigrationconfig_update]
'use strict';

const {ConfigClient} = require('@google-cloud/config');
const {status} = require('@grpc/grpc-js');

const client = new ConfigClient();

/**
 * Updates the auto migration configuration for Infrastructure Manager.
 */
async function updateAutoMigrationConfig() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';

    const autoMigrationConfig = {
      name: `projects/${projectId}/locations/${location}/autoMigrationConfig`,
    };

    const request = {
      autoMigrationConfig,
      updateMask: {
        paths: ['name'],
      },
    };

    const [response] = await client.updateAutoMigrationConfig(request);
    console.log(`Updated auto migration config: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Auto migration config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {updateAutoMigrationConfig};
// [END infra-manager_v1_config_automigrationconfig_update]
