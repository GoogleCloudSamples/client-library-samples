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

// [START bigquerydatatransfer_v1_datatransferservice_check_valid_creds]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Checks whether valid credentials exist for the specified data source.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} dataSourceId - ID of the data source to check credentials for (for example, 'google_cloud_storage').
 * @param {string} locationId - The Google Cloud region or multi-region of the BigQuery Data Transfer Service (for example, 'us' or 'us-central1').
 */
async function checkValidCreds(projectId, dataSourceId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataSources/${dataSourceId}`;
    const request = {
      name,
    };

    const [response] = await client.checkValidCreds(request);
    console.log(`Data source credentials valid: ${response.hasValidCreds}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log('Data source credentials valid: false');
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Data source resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { checkValidCreds };
// [END bigquerydatatransfer_v1_datatransferservice_check_valid_creds]
