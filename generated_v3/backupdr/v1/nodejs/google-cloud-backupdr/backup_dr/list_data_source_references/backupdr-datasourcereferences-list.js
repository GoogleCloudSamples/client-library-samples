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

// [START backupdr_v1_backupdr_datasourcereferences_list]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Lists data source references in a given Google Cloud project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listDataSourceReferences(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [dataSourceReferences] = await client.listDataSourceReferences({
      parent,
    });

    if (!dataSourceReferences || dataSourceReferences.length === 0) {
      console.log('No data source references found.');
      return;
    }

    for (const dataSourceReference of dataSourceReferences) {
      console.log(`Data source reference: ${dataSourceReference.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location or resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid parent format provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Insufficient permissions: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message || err}`);
    }
  }
}

module.exports = { listDataSourceReferences };
// [END backupdr_v1_backupdr_datasourcereferences_list]
