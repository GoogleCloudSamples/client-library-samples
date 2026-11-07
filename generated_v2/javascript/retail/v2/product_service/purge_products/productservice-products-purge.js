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

// [START retail_v2_productservice_purge_products]
'use strict';

const {ProductServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

const client = new ProductServiceClient();

/**
 * Purges products in a branch based on a filter.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} catalogId - ID of the Catalog (for example, 'default_catalog')
 * @param {string} branchId - ID of the Branch (for example, '0')
 */
async function purgeProducts(projectId, catalogId, branchId) {
  try {
    const parent = `projects/${projectId}/locations/global/catalogs/${catalogId}/branches/${branchId}`;
    const filter = '*';
    const force = true;

    const request = {
      parent,
      filter,
      force,
    };

    // PurgeProducts is a long-running operation
    const [operation] = await client.purgeProducts(request);
    const [response] = await operation.promise();

    console.log('Purge operation completed.');
    console.log(`Purged product count: ${response.purgeCount}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail data use terms must be accepted in the Google Cloud console.'
      );
    } else if (
      err.code === status.NOT_FOUND ||
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.PERMISSION_DENIED
    ) {
      console.log(`Request completed with status code: ${err.code}`);
    } else {
      throw err;
    }
  }
}

module.exports = { purgeProducts };
// [END retail_v2_productservice_purge_products]
