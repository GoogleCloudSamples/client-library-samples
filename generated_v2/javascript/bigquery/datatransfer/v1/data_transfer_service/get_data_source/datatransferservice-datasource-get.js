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

// [START bigquerydatatransfer_v1_datatransferservice_datasource_get]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Use the getDataSource method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} dataSourceId - The ID of the supported data source (for example, 'google_cloud_storage' or 'scheduled_query').
 * @param {string} locationId - The Google Cloud region or BigQuery location (for example, 'us' or 'us-central1').
 */
async function getDataSource(projectId, dataSourceId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataSources/${dataSourceId}`;
    const request = {
      name,
    };

    const [dataSource] = await client.getDataSource(request);

    console.log(`Data source ID: ${dataSource.dataSourceId}`);
    console.log(`Display name: ${dataSource.displayName}`);
    console.log(`Description: ${dataSource.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data source not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error retrieving data source: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDataSource };
// [END bigquerydatatransfer_v1_datatransferservice_datasource_get]
