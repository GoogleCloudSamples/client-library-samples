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

// [START backupdr_v1_backupdr_datasource_update]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the updateDataSource method
 *
 * @param {string} projectId - The ID of the Google Cloud project hosting the BackupDR DataSource.
 * @param {string} locationId - The Google Cloud region of the Backup Vault and DataSource (e.g., 'us-central1').
 * @param {string} backupVaultId - The caller-specified ID of the Backup Vault hosting the DataSource.
 * @param {string} dataSourceId - The server-generated ID of the DataSource, obtained from a ListDataSources or GetDataSource response.
 */
async function updateDataSource(projectId, locationId, backupVaultId, dataSourceId) {
  try {
    const updateMask = {
      paths: ['labels'],
    };
    const dataSource = {
      name: `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}/dataSources/${dataSourceId}`,
      labels: {
        env: 'prod',
      },
    };

    const [operation] = await client.updateDataSource({
      dataSource,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated DataSource: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DataSource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Error updating DataSource: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateDataSource };
// [END backupdr_v1_backupdr_datasource_update]
