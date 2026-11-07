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

// [START gkebackup_v1_backupforgke_backupplans_list]
'use strict';

const {BackupForGKEClient} = require('@google-cloud/gke-backup');
const {status} = require('@grpc/grpc-js');

const client = new BackupForGKEClient();

/**
 * Lists Backup for GKE backup plans in a specified location.
 *
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} [projectId] - The Google Cloud project ID (for example, 'example-project-id').
 */
async function listBackupPlans(locationId, projectId) {
  try {
    let location = locationId;
    let project = projectId;

    if (typeof locationId === 'object' && locationId !== null) {
      location = locationId.locationId || locationId.location_id;
      project = locationId.projectId || locationId.project_id;
    }

    if (!project) {
      project = process.env.GOOGLE_CLOUD_PROJECT || (await client.getProjectId());
    }

    if (!location) {
      location = 'us-central1';
    }

    const isRegion = val =>
      typeof val === 'string' && (val === 'global' || /^[a-z]+-[a-z]+[0-9]+$/.test(val));
    if (isRegion(project) && !isRegion(location)) {
      const temp = location;
      location = project;
      project = temp;
    }

    const parent = client.locationPath(project, location);
    const request = {
      parent,
    };

    const [backupPlans] = await client.listBackupPlans(request);

    console.log(`Backup plans in ${parent}:`);
    for (const backupPlan of backupPlans) {
      console.log(`- Name: ${backupPlan.name}`);
      console.log(`  Cluster: ${backupPlan.cluster}`);
      console.log(`  State: ${backupPlan.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google Cloud API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listBackupPlans };
// [END gkebackup_v1_backupforgke_backupplans_list]
