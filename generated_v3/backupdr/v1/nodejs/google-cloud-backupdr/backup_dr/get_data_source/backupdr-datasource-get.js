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

// [START backupdr_v1_backupdr_datasource_get]
'use strict';

const {BackupDRClient} = require('@google-cloud/backupdr');
const {status} = require('@grpc/grpc-js');

const client = new BackupDRClient();

/**
 * Use the getDataSource method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} backupVaultId - The ID of the Backup Vault containing the data source.
 * @param {string} dataSourceId - The server-generated ID of the Data Source to retrieve.
 */
async function getDataSource(projectId, locationId, backupVaultId, dataSourceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/backupVaults/${backupVaultId}/dataSources/${dataSourceId}`;
    const request = {
      name,
    };

    const [dataSource] = await client.getDataSource(request);

    console.log(`Retrieved data source: ${dataSource.name}`);
    console.log(`Data source state: ${dataSource.state}`);
    return dataSource;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data source not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve data source: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDataSource };
// [END backupdr_v1_backupdr_datasource_get]
