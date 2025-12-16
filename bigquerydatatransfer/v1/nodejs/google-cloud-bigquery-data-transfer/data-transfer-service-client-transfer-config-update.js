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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
// [START bigquerydatatransfer_datatransferservice_transferconfig_update]
// [START bigquerydatatransfer_update_config]
const {DataTransferServiceClient} =
  require('@google-cloud/bigquery-data-transfer').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Updates a transfer configuration for a BigQuery data transfer.
 *
 * This sample shows how to update properties of an existing transfer configuration, such as its display name.
 * An update mask is required to specify which fields to modify.
 *
 * @param {string} projectId The Google Cloud project ID, for example 'example-project-id'
 * @param {string} location The location of the transfer config, for example 'us-central1'
 * @param {string} configId The ID of the transfer config to update, for example '1234a-5678-9012b-3456c'
 */
async function updateTransferConfig(projectId, location, configId) {
  const transferConfig = {
    name: `projects/${projectId}/locations/${location}/transferConfigs/${configId}`,
    displayName: 'Example Data Transfer (Update)',
  };

  const request = {
    transferConfig,
    updateMask: {
      paths: ['display_name'],
    },
  };

  try {
    const [response] = await client.updateTransferConfig(request);
    console.log(`Transfer config: ${response.name}`);
    console.log(`  Updated display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transfer config not found: ${transferConfig.name}`);
    } else {
      console.error('An error occurred:', err);
    }
  }
}
// [END bigquerydatatransfer_update_config]
// [END bigquerydatatransfer_datatransferservice_transferconfig_update]
// [END bigquerydatatransfer_v1_datatransferservice_transferconfig_update]

module.exports = {
  updateTransferConfig,
};
