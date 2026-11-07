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

// [START alloydb_v1beta_alloydbadmin_backups_list]
'use strict';

const {AlloyDBAdminClient} = require('@google-cloud/alloydb');
const {status} = require('@grpc/grpc-js');

const client = new AlloyDBAdminClient();

/**
 * Use the listBackups method
 *
 * @param {string} projectId - The Google Cloud project ID where backups will be listed.
 * @param {string} locationId - The Google Cloud region to list backups from (for example, 'us-central1').
 */
async function listBackups(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [backups] = await client.listBackups(request);

    console.log(`Backups in ${parent}:`);
    for (const backup of backups) {
      console.log(`- Name: ${backup.name}`);
      console.log(`  State: ${backup.state}`);
      console.log(`  Source cluster: ${backup.clusterName}`);
      console.log(`  Create time: ${backup.createTime ? backup.createTime.seconds : 'N/A'}`);
    }

    return backups;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Google API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listBackups };
// [END alloydb_v1beta_alloydbadmin_backups_list]
