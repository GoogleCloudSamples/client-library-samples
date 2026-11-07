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

// [START backupdr_v1_backupdr_backupplan_delete]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the deleteBackupPlan method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the BackupPlan is located (for example, 'us-central1').
 * @param {string} backupPlanId - The ID of the BackupPlan to delete. Sourced from an existing BackupPlan. Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens.
 */
async function deleteBackupPlan(projectId, locationId, backupPlanId) {
  const name = `projects/${projectId}/locations/${locationId}/backupPlans/${backupPlanId}`;

  try {
    const [operation] = await client.deleteBackupPlan({name});
    await operation.promise();

    console.log(`Backup plan deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Backup plan does not exist: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot delete backup plan due to active associations: ${err.message}`);
    } else {
      console.error(`Failed to delete backup plan: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteBackupPlan };
// [END backupdr_v1_backupdr_backupplan_delete]
