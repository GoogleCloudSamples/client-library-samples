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

// [START retail_v2beta_productservice_import_products]
'use strict';

const {ProductServiceClient} = require('@google-cloud/retail').v2beta;
const {status} = require('@grpc/grpc-js');

/**
 * Imports products into a catalog branch.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location, typically 'global'.
 * @param {string} catalogId - The catalog ID, typically 'default_catalog'.
 * @param {string} branchId - The branch ID, typically 'default_branch' or '0'.
 */
async function importProducts(projectId, locationId, catalogId, branchId) {
  const client = new ProductServiceClient();

  try {
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}/branches/${branchId}`;

    const products = [
      {
        id: 'example-product-id',
        title: 'Example Product Title',
        description: 'Example product description',
      },
    ];

    const inputConfig = {
      productInlineSource: {
        products,
      },
    };

    const updateMask = {
      paths: ['description'],
    };

    const request = {
      parent,
      inputConfig,
      updateMask,
    };

    // Wait for the long-running operation to complete.
    const [operation] = await client.importProducts(request);
    const [response] = await operation.promise();

    console.log('Import products operation completed.');
    console.log(
      `Error count: ${response.errorSamples ? response.errorSamples.length : 0}`
    );
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail data use terms must be accepted in the Google Cloud console before products can be imported.'
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log('Invalid argument provided for import products.');
    } else if (err.code === status.NOT_FOUND) {
      console.log('Resource not found for import products.');
    } else {
      throw err;
    }
  }
}

module.exports = { importProducts };
// [END retail_v2beta_productservice_import_products]
