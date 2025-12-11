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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_create]
// [START bigquerydatatransfer_datatransferservice_transferconfig_create]
const {DataTransferServiceClient} =
  require('@google-cloud/bigquery-data-transfer').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Creates a transfer configuration for a Google Cloud Storage transfer.
 *
 * This sample demonstrates how to create a transfer configuration that appends
 * data from Google Cloud Storage to a BigQuery dataset.
 *
 * @param {string} projectId The Google Cloud project ID. (for example, 'example-project-id')
 * @param {string} location The BigQuery location where the transfer config should be created. (for example, 'us-central1')
 * @param {string} sourceDataCloudStorageUri The source data to be transferred into BigQuery.
 *   Expects a Cloud Storage object URI. (for example, 'gs://example-bucket/example-data.csv')
 * @param {string} destinationDatasetId The destination BigQuery dataset ID. (for example, 'example_dataset')
 * @param {string} destinationTableName The destination table in the BigQuery dataset. (for example, 'example_destination_table')
 * @param {string} serviceAccountName The service account used by the data transfer process to read data from Google Cloud Storage.
 *   Make sure it has IAM read access to the sourceDataCloudStorageUri [example IAM role: roles/storage.objectViewer]. (for example, 'data-transfer-service-account@example-project-id.iam.gserviceaccount.com')
 */
async function createTransferConfig(
  projectId,
  location,
  sourceDataCloudStorageUri,
  destinationDatasetId,
  destinationTableName,
  serviceAccountName,
) {
  const transferConfig = {
    destinationDatasetId,
    displayName: 'Example Cloud Storage Transfer',
    dataSourceId: 'google_cloud_storage',
    // Params are in google.protobuf.Struct format.
    params: {
      fields: {
        data_path_template: {stringValue: sourceDataCloudStorageUri},
        destination_table_name_template: {stringValue: destinationTableName},
        file_format: {stringValue: 'CSV'},
        skip_leading_rows: {stringValue: '1'},
      },
    },
  };

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    transferConfig,
    serviceAccountName,
  };

  try {
    const [config] = await client.createTransferConfig(request);
    console.log(`Created transfer config: ${config.name}`);
    console.log(`  Display Name: ${config.displayName}`);
    console.log(`  Data Source ID: ${config.dataSourceId}`);
    console.log(`  Destination Dataset ID: ${config.destinationDatasetId}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Transfer config  '${transferConfig.displayName}' (${transferConfig.name}) already exists in project '${projectId}'.`,
      );
    } else {
      console.error('Error creating transfer config:', err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferconfig_create]
// [END bigquerydatatransfer_v1_datatransferservice_transferconfig_create]

module.exports = {
  createTransferConfig,
};
