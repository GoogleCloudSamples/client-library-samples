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

// [START vision_v1_productsearch_productsinproductset_list]
'use strict';

const {ProductSearchClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ProductSearchClient();

/**
 * Lists products in a ProductSet.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud location ID (for example, 'us-west1').
 * @param {string} productSetId - ID of the ProductSet to list products from (for example, 'example-product-set-id').
 */
async function listProductsInProductSet(projectId, locationId, productSetId) {
  // Vision Product Search is supported only in us-west1, us-east1, asia-east1, and europe-west1.
  const supportedLocations = [
    'us-west1',
    'us-east1',
    'asia-east1',
    'europe-west1',
  ];
  const targetLocationId = supportedLocations.includes(locationId)
    ? locationId
    : 'us-west1';

  try {
    const name = client.productSetPath(projectId, targetLocationId, productSetId);
    const request = {
      name,
    };

    const [products] = await client.listProductsInProductSet(request);

    console.log(`Products in product set: ${name}`);
    for (const product of products) {
      console.log(`Product name: ${product.name}`);
      console.log(`Product display name: ${product.displayName}`);
      console.log(`Product category: ${product.productCategory}`);
    }
    if (products.length === 0) {
      console.log('No products found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listProductsInProductSet };
// [END vision_v1_productsearch_productsinproductset_list]
