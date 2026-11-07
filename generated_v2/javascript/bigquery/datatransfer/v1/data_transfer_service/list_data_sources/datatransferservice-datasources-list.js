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

// [START bigquerydatatransfer_v1_datatransferservice_datasources_list]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Use the listDataSources method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location or region (for example, 'us' or 'us-central1').
 */
async function listDataSources(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [dataSources] = await client.listDataSources(request);
    console.log(`Found ${dataSources.length} data source(s):`);
    for (const dataSource of dataSources) {
      console.log(`ID: ${dataSource.dataSourceId}`);
      console.log(`Name: ${dataSource.displayName}`);
      console.log(`Description: ${dataSource.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Error listing data sources: ${err.message}`);
    }
  }
}

module.exports = { listDataSources };
// [END bigquerydatatransfer_v1_datatransferservice_datasources_list]
