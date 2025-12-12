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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]
// [START bigquerydatatransfer_datatransferservice_transferconfigs_list]
const {
  DataTransferServiceClient,
} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Lists all transfer configurations for a project.
 * This shows how to iterate through all the transfer configurations in a project.
 *
 * @param {string} projectId Google Cloud Project ID (for example, 'example-project-id').
 * @param {string} [location="us-central1"] Google Cloud location (for example, 'us-central1').
 */
async function listTransferConfigs(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    const [configs] = await client.listTransferConfigs(request);

    if (configs.length === 0) {
      console.error(
        `No transfer configurations found in project '${projectId}' at location '${location}'.`,
      );
      return;
    }

    console.log(`Found ${configs.length} transfer configurations:`);
    for (const config of configs) {
      console.log(`\nConfiguration: ${config.name}`);
      console.log(`  Display Name: ${config.displayName}`);
      console.log(`  Data Source ID: ${config.dataSourceId}`);
      console.log(`  Destination Dataset ID: ${config.destinationDatasetId}`);
      console.log(`  State: ${config.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Project '${projectId}' not found or BigQuery Data Transfer API is not enabled.`,
      );
    } else {
      console.error('Error listing transfer configurations:', err);
    }
  }
}
// [END bigquerydatatransfer_datatransferservice_transferconfigs_list]
// [END bigquerydatatransfer_v1_datatransferservice_transferconfigs_list]

module.exports = {
  listTransferConfigs,
};
