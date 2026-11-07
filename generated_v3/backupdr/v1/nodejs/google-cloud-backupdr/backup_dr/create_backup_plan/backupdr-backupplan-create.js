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

// [START backupdr_v1_backupdr_backupplan_create]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the createBackupPlan method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the BackupPlan is created (for example, 'us-central1').
 * @param {string} backupVaultId - The ID of the existing BackupVault used as the storage location for backups (for example, 'example-backup-vault').
 * @param {string} backupPlanId - Caller-chosen unique identifier for the BackupPlan to create. Must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens (for example, 'sample-backup-plan').
 */
async function createBackupPlan(projectId, locationId, backupVaultId, backupPlanId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const backupWindow = {
      startHourOfDay: 0,
      endHourOfDay: 6,
    };

    const standardSchedule = {
      recurrenceType: 'DAILY',
      timeZone: 'UTC',
      backupWindow,
    };

    const dailyRule = {
      ruleId: 'daily-rule',
      backupRetentionDays: 30,
      standardSchedule,
    };

    const backupPlan = {
      resourceType: 'compute.googleapis.com/Instance',
      backupVault: `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}`,
      backupRules: [dailyRule],
    };

    const [operation] = await client.createBackupPlan({
      parent,
      backupPlanId,
      backupPlan,
    });

    const [response] = await operation.promise();
    console.log(`Created backup plan: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Backup plan already exists: ${backupPlanId}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createBackupPlan };
// [END backupdr_v1_backupdr_backupplan_create]
