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

// [START vision_v1p4beta1_productsearch_purge_products]
'use strict';

const {ProductSearchClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ProductSearchClient();

/**
 * Use the purgeProducts method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function purgeProducts(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const deleteOrphanProducts = true;
    const force = true;

    const request = {
      parent,
      deleteOrphanProducts,
      force,
    };

    const [operation] = await client.purgeProducts(request);
    console.log(`Operation initiated: ${operation.name}`);

    // Wait for the long-running operation to complete.
    await operation.promise();
    console.log('Products purged successfully.');
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { purgeProducts };
// [END vision_v1p4beta1_productsearch_purge_products]
