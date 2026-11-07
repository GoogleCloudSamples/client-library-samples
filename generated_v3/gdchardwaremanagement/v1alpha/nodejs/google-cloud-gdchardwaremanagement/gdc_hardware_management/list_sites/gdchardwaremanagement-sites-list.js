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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_sites_list]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the listSites method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1' or '-' for all locations).
 */
async function listSites(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [sites] = await client.listSites(request);

    for (const site of sites) {
      console.log(`Site Name: ${site.name}`);
      console.log(`Display Name: ${site.displayName}`);
      console.log(`Description: ${site.description}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing sites: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Location resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listSites };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_sites_list]
