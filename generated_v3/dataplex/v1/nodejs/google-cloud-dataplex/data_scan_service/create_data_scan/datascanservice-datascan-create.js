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

// [START dataplex_v1_datascanservice_datascan_create]
'use strict';

const {DataScanServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataScanServiceClient();

/**
 * Creates a Dataplex data scan.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createDataScan(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const dataScanId = 'example-datascan-id';
    const dataScan = {
      description: 'Data scan for data profile analysis',
      displayName: 'Example Data Scan',
      data: {
        resource: `//bigquery.googleapis.com/projects/${projectId}/datasets/example_dataset/tables/example_table`,
      },
      dataProfileSpec: {},
    };

    const [operation] = await client.createDataScan({
      parent,
      dataScan,
      dataScanId,
    });
    const [response] = await operation.promise();

    console.log(`Created data scan: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data scan already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create data scan: ${err.message}`);
    }
  }
}

module.exports = { createDataScan };
// [END dataplex_v1_datascanservice_datascan_create]
