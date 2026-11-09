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

// [START dataplex_v1_datascanservice_datascan_get]
'use strict';

const {DataScanServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataScanServiceClient();

/**
 * Retrieves a Dataplex DataScan resource.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} dataScanId - ID of the DataScan (for example, 'example-datascan-id')
 */
async function getDataScan(projectId, locationId, dataScanId) {
  try {
    const name = client.dataScanPath(projectId, locationId, dataScanId);

    const request = {
      name,
    };

    const [response] = await client.getDataScan(request);

    console.log(`Data scan name: ${response.name}`);
    console.log(`Data scan state: ${response.state}`);
    console.log(`Data scan create time: ${response.createTime ? response.createTime.seconds : 'N/A'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data scan not found: ${err.message}`);
    } else {
      console.error(`Error retrieving data scan: ${err.message}`);
    }
  }
}

module.exports = { getDataScan };
// [END dataplex_v1_datascanservice_datascan_get]
