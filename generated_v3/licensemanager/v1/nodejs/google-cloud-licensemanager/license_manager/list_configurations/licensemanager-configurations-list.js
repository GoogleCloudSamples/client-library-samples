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

// [START licensemanager_v1_licensemanager_configurations_list]
'use strict';

const {LicenseManagerClient} = require('@google-cloud/licensemanager');
const {status} = require('@grpc/grpc-js');

const client = new LicenseManagerClient();

/**
 * Lists license configurations in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, 'us-central1').
 */
async function listConfigurations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [configurations] = await client.listConfigurations(request);

    console.log(`Retrieved ${configurations.length} configuration(s).`);
    for (const configuration of configurations) {
      console.log(`Configuration: ${configuration.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message || err}`);
    }
  }
}

module.exports = { listConfigurations };
// [END licensemanager_v1_licensemanager_configurations_list]
