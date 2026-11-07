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

// [START osconfig_v1_osconfigzonalservice_inventory_get]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Retrieves the OS inventory data for a Compute Engine VM instance.
 *
 * @param {string} projectId Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId Compute Engine zone where the instance resides (for example, 'us-central1-a').
 * @param {string} instanceId Compute Engine instance name or numeric ID (for example, 'example-instance').
 */
async function getInventory(projectId, locationId, instanceId) {
  const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}/inventory`;
  const request = {
    name,
  };

  try {
    let response;
    // Compute Engine instances require time for the OS Config agent to report initial inventory.
    const maxRetries = 12;
    const retryDelayMs = 5000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        [response] = await client.getInventory(request);
        break;
      } catch (err) {
        if (err.code === status.NOT_FOUND && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelayMs));
          continue;
        }
        throw err;
      }
    }

    console.log(`Inventory name: ${response.name}`);
    if (response.osInfo) {
      console.log(`Operating system: ${response.osInfo.longName}`);
      console.log(`Architecture: ${response.osInfo.architecture}`);
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Inventory resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing inventory: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Google API error (${err.code}): ${err.message}`);
    }
  }
}

module.exports = {getInventory};
// [END osconfig_v1_osconfigzonalservice_inventory_get]
