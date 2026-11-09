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

// [START dataplex_v1_datascanservice_datascanjob_get]
'use strict';

const {DataScanServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataScanServiceClient();

/**
 * Use the getDataScanJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the DataScan is located (for example, 'us-central1').
 * @param {string} dataScanId - The caller-chosen identifier of the DataScan (for example, 'example-datascan-id').
 * @param {string} dataScanJobId - The server-generated ID of the DataScanJob, obtained from a previous RunDataScan or ListDataScanJobs call (for example, 'example-datascanjob-id').
 */
async function getDataScanJob(projectId, locationId, dataScanId, dataScanJobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataScans/${dataScanId}/jobs/${dataScanJobId}`;
    const request = {
      name,
      view: 'FULL',
    };

    const [dataScanJob] = await client.getDataScanJob(request);

    console.log(`Retrieved DataScan job: ${dataScanJob.name}`);
    console.log(`State: ${dataScanJob.state}`);
    return dataScanJob;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DataScan job not found: ${err.message}`);
    } else {
      console.error(`Error retrieving DataScan job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDataScanJob };
// [END dataplex_v1_datascanservice_datascanjob_get]
