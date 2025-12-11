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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_get]
// [START bigquerydatatransfer_datatransferservice_transferconfig_get]
const {DataTransferServiceClient} =
  require('@google-cloud/bigquery-data-transfer').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Gets a transfer configuration for a BigQuery data transfer.
 * A transfer configuration contains all metadata needed to perform a data transfer.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The Google Cloud region (for example, 'us-central1').
 * @param {string} configId The transfer configuration ID (for example, '1234a567-b89c-12d3-45e6-f789g01h23i4').
 */
async function getTransferConfig(projectId, location, configId) {
  const name = client.projectLocationTransferConfigPath(
    projectId,
    location,
    configId,
  );
  const request = {
    name,
  };

  try {
    const [config] = await client.getTransferConfig(request);
    console.log(`Got transfer config: ${config.name}`);
    console.log(`  Display Name: ${config.displayName}`);
    console.log(`  Data Source ID: ${config.dataSourceId}`);
    console.log(`  Destination Dataset ID: ${config.destinationDatasetId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Transfer config ${configId} not found in project ${projectId} in location ${location}.`,
      );
    } else {
      console.error(`Error getting transfer config ${configId}:`, err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferconfig_get]
// [END bigquerydatatransfer_v1_datatransferservice_transferconfig_get]

module.exports = {
  getTransferConfig,
};
