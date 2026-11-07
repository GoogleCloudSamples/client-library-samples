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

// [START datalineage_v1_configmanagementservice_config_update]
'use strict';

const {ConfigManagementServiceClient} = require('@google-cloud/configmanagement');
const {status} = require('@grpc/grpc-js');

const client = new ConfigManagementServiceClient();

/**
 * Use the updateConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the configuration, typically 'global'.
 */
async function updateConfig(projectId, locationId) {
  try {
    const configName = `projects/${projectId}/locations/${locationId}/config`;

    // Retrieve the existing configuration to preserve the etag for replacement.
    const [currentConfig] = await client.getConfig({name: configName});

    const lineageEnablement = {
      enabled: true,
    };

    const dataprocRule = {
      integration: 'DATAPROC',
      lineageEnablement,
    };

    const config = {
      name: currentConfig.name,
      etag: currentConfig.etag,
      ingestionRules: [dataprocRule],
    };

    const request = {
      config,
    };

    const [response] = await client.updateConfig(request);
    console.log(`Updated configuration: ${response.name}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed during config update: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Configuration resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { updateConfig };
// [END datalineage_v1_configmanagementservice_config_update]
