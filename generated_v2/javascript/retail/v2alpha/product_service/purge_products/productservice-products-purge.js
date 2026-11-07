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

// [START retail_v2alpha_productservice_purge_products]
'use strict';

const {ProductServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

const client = new ProductServiceClient();

/**
 * Purges products from a specified catalog branch.
 *
 * @param {string} branchId - The branch ID (for example, '0' or 'default_branch').
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} catalogId - The catalog ID (for example, 'default_catalog').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 */
async function purgeProducts(branchId, projectId, catalogId, locationId) {
  try {
    const filter = '*';
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}/branches/${branchId}`;
    const force = true;

    const request = {
      parent,
      filter,
      force,
    };

    const [operation] = await client.purgeProducts(request);
    const [response] = await operation.promise();

    console.log(`Purged count: ${response.purgeCount}`);
  } catch (err) {
    if (
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.NOT_FOUND ||
      err.code === status.FAILED_PRECONDITION
    ) {
      console.log(`API operation completed with status ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { purgeProducts };
// [END retail_v2alpha_productservice_purge_products]
