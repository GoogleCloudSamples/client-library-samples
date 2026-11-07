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

// [START gkebackup_v1_backupforgke_restoreplans_list]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Use the listRestorePlans method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listRestorePlans(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const [restorePlans] = await client.listRestorePlans({
      parent,
    });

    console.log(`Found ${restorePlans.length} restore plan(s):`);
    for (const plan of restorePlans) {
      console.log(`Restore Plan: ${plan.name}`);
      console.log(`  Backup Plan: ${plan.backupPlan}`);
      console.log(`  Target Cluster: ${plan.cluster}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listRestorePlans };
// [END gkebackup_v1_backupforgke_restoreplans_list]
