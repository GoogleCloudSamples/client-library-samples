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

// [START dataplex_v1_dataproductservice_dataproducts_list]
'use strict';

const {DataProductServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new DataProductServiceClient();

/**
 * Lists data products within a specified project and location.
 */
async function listDataProducts() {
  try {
    const projectIdOrNumber = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectIdOrNumber}/locations/${location}`;

    const request = {
      parent,
    };

    const [dataProducts] = await client.listDataProducts(request);

    for (const dataProduct of dataProducts) {
      console.log(`Data product name: ${dataProduct.name}`);
      console.log(`Display name: ${dataProduct.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided:', err.message);
    } else {
      console.error('Listing data products encountered an error:', err);
    }
  }
}

module.exports = { listDataProducts };
// [END dataplex_v1_dataproductservice_dataproducts_list]
