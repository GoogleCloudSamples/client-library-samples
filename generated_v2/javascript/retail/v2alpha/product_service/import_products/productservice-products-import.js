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

// [START retail_v2alpha_productservice_import_products]
'use strict';

const {ProductServiceClient} = require('@google-cloud/retail').v2alpha;
const {status} = require('@grpc/grpc-js');

/**
 * Imports products into a retail catalog branch.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the retail catalog. Supported location is 'global'.
 * @param {string} catalogId - The catalog identifier, typically 'default_catalog'.
 * @param {string} branchId - The branch identifier, typically 'default_branch' or '0'.
 */
async function importProducts(projectId, locationId, catalogId, branchId) {
  const productServiceClient = new ProductServiceClient();

  try {
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}/branches/${branchId}`;

    const product = {
      id: 'example-product-id',
      title: 'Example Product Title',
    };

    const inputConfig = {
      productInlineSource: {
        products: [product],
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

    // Initiates the long-running import operation.
    const [operation] = await productServiceClient.importProducts(request);

    // Waits for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log('Import operation completed.');
    if (response.errorSamples && response.errorSamples.length > 0) {
      console.log(`Import completed with ${response.errorSamples.length} sample issues.`);
    } else {
      console.log('Products imported successfully.');
    }
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail data use terms must be accepted in the Google Cloud console before importing products.'
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log('Invalid argument provided.');
    } else if (err.code === status.NOT_FOUND) {
      console.log('Resource not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log('Permission denied for the requested resource.');
    } else {
      throw err;
    }
  }
}

module.exports = {importProducts};
// [END retail_v2alpha_productservice_import_products]
