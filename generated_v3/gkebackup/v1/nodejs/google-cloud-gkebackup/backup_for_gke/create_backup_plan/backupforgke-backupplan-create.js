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

// [START gkebackup_v1_backupforgke_backupplan_create]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Use the createBackupPlan method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupPlanId - ID of the BackupPlan (for example, 'example-backupplan-id')
 * @param {string} clusterId - The ID of the GKE cluster to back up.
 */
async function createBackupPlan(projectId, locationId, backupPlanId, clusterId) {
  try {
    const backupPlan = {
      cluster: `projects/${projectId}/locations/${locationId}/clusters/${clusterId}`,
      backupConfig: {
        allNamespaces: true,
      },
    };
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
      backupPlanId,
      backupPlan,
    };

    // Initiates the long-running operation to create the BackupPlan
    const [operation] = await client.createBackupPlan(request);
    const [response] = await operation.promise();

    console.log(`Backup plan created successfully: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup plan already exists: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error occurred with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createBackupPlan };
// [END gkebackup_v1_backupforgke_backupplan_create]
