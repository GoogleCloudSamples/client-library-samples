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

// [START backupdr_v1_backupdr_fetch_backup_plan_associations_for_resource_type]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the fetchBackupPlanAssociationsForResourceType method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function fetchBackupPlanAssociationsForResourceType(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const resourceType = 'compute.googleapis.com/Instance';

    const request = {
      parent,
      resourceType,
    };

    const [response] =
      await client.fetchBackupPlanAssociationsForResourceType(request);

    const associations = Array.isArray(response)
      ? response
      : response.backupPlanAssociations || [];

    for (const association of associations) {
      console.log(`Backup plan association: ${association.name}`);
    }
    console.log(`Total associations fetched: ${associations.length}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error: ${err.message}`);
    }
  }
}

module.exports = { fetchBackupPlanAssociationsForResourceType };
// [END backupdr_v1_backupdr_fetch_backup_plan_associations_for_resource_type]
