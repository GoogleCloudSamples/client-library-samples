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

// [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
// [START bigquerydatatransfer_datatransferservice_datasources_list]
// [START bigquerydatatransfer_quickstart]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists all available data sources for a project.
 * Data sources are the services that can be used to create data transfers into BigQuery.
 *
 * @param {string} projectId The Google Cloud project ID, for example 'example-project-id'.
 */
async function listDataSources(projectId) {
  const request = {
    parent: `projects/${projectId}`,
  };

  try {
    const [dataSources] = await client.listDataSources(request);

    if (dataSources.length === 0) {
      console.log(`No data sources found in project ${projectId}.`);
      return;
    }

    console.log('Supported data sources:');
    for (const dataSource of dataSources) {
      console.log(`\nData source: ${dataSource.name}`);
      console.log(`  ID: ${dataSource.dataSourceId}`);
      console.log(`  Display Name: ${dataSource.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} not found.`);
    } else {
      console.error('An error occurred:', err);
    }
  }
}
// [END bigquerydatatransfer_quickstart]
// [END bigquerydatatransfer_datatransferservice_datasources_list]
// [END bigquerydatatransfer_v1_datatransferservice_datasources_list]

module.exports = {
  listDataSources,
};
