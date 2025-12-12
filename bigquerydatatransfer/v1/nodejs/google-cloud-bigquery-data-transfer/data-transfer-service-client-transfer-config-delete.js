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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_delete]
// [START bigquerydatatransfer_datatransferservice_transferconfig_delete]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Deletes a data transfer configuration.
 * This sample demonstrates how to delete a transfer configuration, which also
 * removes its associated transfer runs and logs.
 *
 * @param {string} projectId Your Google Cloud project ID, for example 'example-project-id'
 * @param {string} location The BigQuery location, for example 'us-central1'
 * @param {string} configId The transfer configuration ID, for example '1234a567-b89c-12d3-45e6-f789g01h23i4'
 */
async function deleteTransferConfig(projectId, location, configId) {
  const name = client.projectLocationTransferConfigPath(
    projectId,
    location,
    configId,
  );
  const request = {
    name,
  };

  try {
    await client.deleteTransferConfig(request);
    console.log(`Transfer config deleted '${configId}'`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer config '${configId}' not found.`);
    } else {
      console.error(`Error deleting transfer config '${configId}':`, err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferconfig_delete]
// [END bigquerydatatransfer_v1_datatransferservice_transferconfig_delete]

module.exports = {
  deleteTransferConfig,
};
