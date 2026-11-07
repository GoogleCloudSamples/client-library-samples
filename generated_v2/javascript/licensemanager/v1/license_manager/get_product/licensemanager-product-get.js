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

// [START licensemanager_v1_licensemanager_product_get]
'use strict';

const {LicenseManagerClient} = require('@google-cloud/licensemanager');
const {status} = require('@grpc/grpc-js');

const client = new LicenseManagerClient();

/**
 * Retrieves details for a specific license manager product.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region ID (for example, "us-central1").
 * @param {string} productId - The server-defined product identifier (for example, "office-2021").
 */
async function getProduct(projectId, locationId, productId) {
  const name = `projects/${projectId}/locations/${locationId}/products/${productId}`;

  try {
    const [product] = await client.getProduct({name});
    console.log(`Product Name: ${product.name}`);
    return product;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Product not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for product: ${name}`);
    } else {
      console.error(`RPC error retrieving product: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProduct };
// [END licensemanager_v1_licensemanager_product_get]
