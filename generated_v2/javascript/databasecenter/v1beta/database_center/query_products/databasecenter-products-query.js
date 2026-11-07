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

// [START databasecenter_v1beta_databasecenter_query_products]
'use strict';

const {DatabaseCenterClient} = require('@google-cloud/databasecenter');
const {status} = require('@grpc/grpc-js');

const client = new DatabaseCenterClient();

/**
 * Queries database products for a given project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function queryProducts(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [response] = await client.queryProducts(request);
    console.log('Query completed successfully.');
    if (response.products) {
      for (const product of response.products) {
        console.log(`Product: ${product.name || product.productType || JSON.stringify(product)}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`An unexpected error occurred: ${err.message}`);
    }
  }
}

module.exports = { queryProducts };
// [END databasecenter_v1beta_databasecenter_query_products]
