// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START bigquerydatatransfer_v1_datatransferservice_datasource_get]
// [START bigquerydatatransfer_datatransferservice_datasource_get]
const {DataTransferServiceClient} =
  require('@google-cloud/bigquery-data-transfer').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Retrieves a supported data source and returns its settings.
 * This sample shows how to get a data source's details, to understand its parameters and capabilities before creating a transfer.
 *
 * @param {string} projectId The project ID to use, for example 'example-project-id'
 * @param {string} location The location to use, for example 'us-central1'
 * @param {string} dataSourceId The data source ID to use, for example 'google_cloud_storage'
 */
async function getDataSource(projectId, location, dataSourceId) {
  const name = client.projectLocationDataSourcePath(
    projectId,
    location,
    dataSourceId,
  );

  const request = {
    name,
  };

  try {
    const [dataSource] = await client.getDataSource(request);
    console.log(`Data source ${dataSource.name} retrieved:`);
    console.log(`  Display Name: ${dataSource.displayName}`);
    console.log(`  Description: ${dataSource.description}`);
    console.log(`  Data Source ID: ${dataSource.dataSourceId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Data source ${dataSourceId} not found in project ${projectId} in location ${location}.`,
      );
    } else {
      console.error(`Error getting data source ${dataSourceId}:`, err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_datasource_get]
// [END bigquerydatatransfer_v1_datatransferservice_datasource_get]

module.exports = {
  getDataSource,
};
