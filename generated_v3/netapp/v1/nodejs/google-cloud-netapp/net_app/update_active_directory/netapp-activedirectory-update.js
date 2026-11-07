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

// [START netapp_v1_netapp_activedirectory_update]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Updates an Active Directory resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the Active Directory resource.
 * @param {string} activeDirectoryId - The ID of the Active Directory resource to update.
 */
async function updateActiveDirectory(projectId, locationId, activeDirectoryId) {
  try {
    const activeDirectory = {
      name: `projects/${projectId}/locations/${locationId}/activeDirectories/${activeDirectoryId}`,
      description: 'Updated Active Directory description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateActiveDirectory({
      activeDirectory,
      updateMask,
    });

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Active Directory updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Active Directory resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update Active Directory: ${err.message}`);
    }
  }
}

module.exports = { updateActiveDirectory };
// [END netapp_v1_netapp_activedirectory_update]
