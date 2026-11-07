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

// [START retail_v2_productservice_import_products]
'use strict';

const {ProductServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

/**
 * Imports products into a Cloud Retail branch catalog.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - The Retail location ID. Typically 'global'.
 * @param {string} catalogId - The Retail catalog ID. Typically 'default_catalog'.
 * @param {string} branchId - The Retail branch ID. Typically 'default_branch' or '0'.
 */
async function importProducts(projectId, locationId, catalogId, branchId) {
  const client = new ProductServiceClient(
    locationId === 'global'
      ? {}
      : {apiEndpoint: `${locationId}-retail.googleapis.com`}
  );

  try {
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}/branches/${branchId}`;
    const inputConfig = {
      productInlineSource: {
        products: [
          {
            id: 'example-product-id',
            title: 'Example Product Title',
            categories: ['example-category'],
          },
        ],
      },
    };
    const updateMask = {
      paths: ['title'],
    };

    const request = {
      parent,
      inputConfig,
      updateMask,
    };

    const [operation] = await client.importProducts(request);
    console.log(`Import operation started: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Import operation completed successfully.');
    console.log(`Joined product count: ${response.joinedSuccessCount ?? 0}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Precondition not met: Cloud Retail data use terms must be accepted in the Google Cloud console.'
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided.');
    } else if (err.code === status.NOT_FOUND) {
      console.error('Target resource not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied.');
    } else {
      throw err;
    }
  }
}

module.exports = {importProducts};
// [END retail_v2_productservice_import_products]
