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

// [START backupdr_v1_backupdr_backupplanassociations_list]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Lists backup plan associations in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function listBackupPlanAssociations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [associations] = await client.listBackupPlanAssociations(request);
    if (!associations || associations.length === 0) {
      console.log(`No backup plan associations found in location ${locationId}.`);
      return;
    }

    for (const association of associations) {
      console.log(`Association name: ${association.name}`);
      console.log(`Resource: ${association.resource}`);
      console.log(`Backup plan: ${association.backupPlan}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${projectId}/${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for location: ${projectId}/${locationId}`);
    } else if (err.code !== undefined) {
      console.error(`API Error ${err.code}: ${err.message}`);
    } else {
      console.error(`Execution failed: ${err.message}`);
    }
  }
}

module.exports = { listBackupPlanAssociations };
// [END backupdr_v1_backupdr_backupplanassociations_list]
