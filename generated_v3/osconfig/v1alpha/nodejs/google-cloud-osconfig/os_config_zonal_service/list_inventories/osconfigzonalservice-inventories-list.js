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

// [START osconfig_v1alpha_osconfigzonalservice_inventories_list]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Use the listInventories method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listInventories(projectId) {
  try {
    const location = 'us-central1-a';
    const parent = `projects/${projectId}/locations/${location}/instances/-`;

    const request = {
      parent,
    };

    const [inventories] = await client.listInventories(request);

    for (const inventory of inventories) {
      console.log(`Inventory name: ${inventory.name}`);
      if (inventory.osInfo) {
        console.log(`  OS: ${inventory.osInfo.hostname} (${inventory.osInfo.longName})`);
      }
    }
    console.log(`Listed ${inventories.length} inventories.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listInventories };
// [END osconfig_v1alpha_osconfigzonalservice_inventories_list]
