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

// [START netapp_v1_netapp_activedirectory_delete]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Use the deleteActiveDirectory method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) where the Active Directory resource is located.
 * @param {string} activeDirectoryId - The Active Directory resource identifier.
 */
async function deleteActiveDirectory(projectId, locationId, activeDirectoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/activeDirectories/${activeDirectoryId}`;

    // Initiates the deletion long-running operation and waits for completion
    const [operation] = await client.deleteActiveDirectory({name});
    await operation.promise();

    console.log(`Active Directory deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Active Directory not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Active Directory cannot be deleted while in use: ${err.message}`);
    } else {
      console.error(`Failed to delete Active Directory: ${err.message}`);
    }
  }
}

module.exports = { deleteActiveDirectory };
// [END netapp_v1_netapp_activedirectory_delete]
