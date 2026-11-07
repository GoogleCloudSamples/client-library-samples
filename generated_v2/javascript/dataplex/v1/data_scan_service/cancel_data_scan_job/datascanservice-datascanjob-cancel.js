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

// [START dataplex_v1_datascanservice_datascanjob_cancel]
'use strict';

const {DataScanServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataScanServiceClient();

/**
 * Cancels a running or pending DataScanJob.
 *
 * @param {string} locationId - The Google Cloud region where the DataScan is located (for example, 'us-central1').
 * @param {string} dataScanId - The identifier of the DataScan (for example, 'example-data-scan').
 * @param {string} dataScanJobId - The server-generated ID of the DataScanJob to cancel.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function cancelDataScanJob(locationId, dataScanId, dataScanJobId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataScans/${dataScanId}/jobs/${dataScanJobId}`;
    const request = {
      name,
    };

    await client.cancelDataScanJob(request);
    console.log(`Canceled data scan job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data scan job not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Cannot cancel job in current state: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API RPC error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { cancelDataScanJob };
// [END dataplex_v1_datascanservice_datascanjob_cancel]
