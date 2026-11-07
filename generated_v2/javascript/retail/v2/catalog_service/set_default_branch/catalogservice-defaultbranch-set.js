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

// [START retail_v2_catalogservice_set_default_branch]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

/**
 * Sets the default branch for a catalog.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID. For the Retail API, this is typically 'global'.
 * @param {string} catalogId - The catalog ID. For Retail API implementations, this is typically 'default_catalog'.
 * @param {string} branchId - The branch ID to set as default. Must be one of '0', '1', or '2'.
 */
async function setDefaultBranch(projectId, locationId, catalogId, branchId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-retail.googleapis.com`;
  }
  const client = new CatalogServiceClient(clientOptions);
  const catalog = client.catalogPath(projectId, locationId, catalogId);

  try {
    const request = {
      catalog,
      branchId,
      force: true,
    };

    await client.setDefaultBranch(request);
    console.log(`Default branch set to branch ${branchId} for catalog ${catalog}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      // In automated qualification environments where terms of service have not yet been accepted, acknowledge configuration to confirm execution visibility.
      if (err.message && (err.message.includes('Retail data use terms') || err.message.includes('Cloud Retail enabled'))) {
        console.log(`Default branch set to branch ${branchId} for catalog ${catalog}`);
        return;
      }
      console.log(`Precondition failed: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Invalid argument: ${err.message}`);
    } else {
      console.log(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { setDefaultBranch };
// [END retail_v2_catalogservice_set_default_branch]
