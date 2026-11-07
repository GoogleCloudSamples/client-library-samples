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

// [START infra-manager_v1_config_terraformversions_list]
'use strict';

const {ConfigClient} = require('@google-cloud/config');
const {status} = require('@grpc/grpc-js');

const client = new ConfigClient();

/**
 * Use the listTerraformVersions method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listTerraformVersions(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const [terraformVersions] = await client.listTerraformVersions({
      parent,
    });

    for (const version of terraformVersions) {
      console.log(`Terraform Version: ${version.name}`);
      console.log(`State: ${version.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API Error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Execution error: ${err.message}`);
    }
  }
}

module.exports = { listTerraformVersions };
// [END infra-manager_v1_config_terraformversions_list]
