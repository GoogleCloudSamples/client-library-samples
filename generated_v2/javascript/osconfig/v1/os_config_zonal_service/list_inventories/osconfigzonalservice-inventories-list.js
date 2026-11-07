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

// [START osconfig_v1_osconfigzonalservice_inventories_list]
'use strict';

const {OsConfigZonalServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigZonalServiceClient();

/**
 * Lists OS inventory data for Compute Engine instances in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listInventories(projectId) {
  try {
    // Construct parent resource path using wildcard '-' to list inventories across instances
    const parent = `projects/${projectId}/locations/us-central1-a/instances/-`;

    const request = {
      parent,
    };

    const [inventories] = await client.listInventories(request);

    if (inventories.length === 0) {
      console.log('No inventories found.');
      return;
    }

    for (const inventory of inventories) {
      console.log(`Inventory: ${inventory.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listInventories };
// [END osconfig_v1_osconfigzonalservice_inventories_list]
