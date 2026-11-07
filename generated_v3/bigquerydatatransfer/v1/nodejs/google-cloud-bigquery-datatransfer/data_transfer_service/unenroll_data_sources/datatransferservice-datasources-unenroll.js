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

// [START bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
'use strict';

const {DataTransferServiceClient} = require('@google-cloud/bigquery-data-transfer');
const {status} = require('@grpc/grpc-js');

const client = new DataTransferServiceClient();

/**
 * Use the unenrollDataSources method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region or multi-region (for example, 'us' or 'us-central1').
 * @param {string} dataSourceId - The ID of the data source to unenroll (for example, 'cross_region_copy').
 */
async function unenrollDataSources(projectId, locationId, dataSourceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;
    const request = {
      name,
      dataSourceIds: [dataSourceId],
    };

    await client.unenrollDataSources(request);
    console.log(`Unenrolled data source ${dataSourceId} from ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to unenroll data sources: ${err.message}`);
    }
  }
}

module.exports = { unenrollDataSources };
// [END bigquerydatatransfer_v1_datatransferservice_unenroll_data_sources]
