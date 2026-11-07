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

// [START netapp_v1_netapp_backuppolicies_list]
'use strict';

const {NetAppClient} = require('@google-cloud/netapp');
const {status} = require('@grpc/grpc-js');

const client = new NetAppClient();

/**
 * Lists NetApp backup policies in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) to list backup policies for.
 */
async function listBackupPolicies(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [backupPolicies] = await client.listBackupPolicies({
      parent,
    });

    console.log(`Backup policies found in ${locationId}:`);
    for (const backupPolicy of backupPolicies) {
      console.log(`- ${backupPolicy.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified location was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing backup policies: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list backup policies: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackupPolicies };
// [END netapp_v1_netapp_backuppolicies_list]
