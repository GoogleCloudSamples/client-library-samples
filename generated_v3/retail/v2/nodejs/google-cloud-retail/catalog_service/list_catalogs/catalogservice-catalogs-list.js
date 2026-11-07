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

// [START retail_v2_catalogservice_catalogs_list]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Lists all catalogs associated with a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID. Retail service catalogs typically use `global`.
 */
async function listCatalogs(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [catalogs] = await client.listCatalogs(request);

    for (const catalog of catalogs) {
      console.log(`Catalog Name: ${catalog.name}`);
      console.log(`Display Name: ${catalog.displayName}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.details || err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.details || err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.details || err.message}`);
    } else if (err.code) {
      console.error(`Google API RPC error [code ${err.code}]: ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listCatalogs };
// [END retail_v2_catalogservice_catalogs_list]
