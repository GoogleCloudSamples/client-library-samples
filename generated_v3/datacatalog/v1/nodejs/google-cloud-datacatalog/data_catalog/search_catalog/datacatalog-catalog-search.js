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

// [START datacatalog_v1_datacatalog_catalog_search]
'use strict';

const {DataCatalogClient} = require('@google-cloud/datacatalog');
const {status} = require('@grpc/grpc-js');

const client = new DataCatalogClient();

/**
 * Use the searchCatalog method
 *
 * @param {string} projectId - The Google Cloud project ID to scope the search within.
 * @param {string} query - The query string matching Data Catalog search syntax, or empty to list all accessible assets in scope.
 */
async function searchCatalog(projectId, query) {
  try {
    const scope = {
      includeProjectIds: [projectId],
    };

    const request = {
      scope,
      query,
    };

    const [results] = await client.searchCatalog(request);

    console.log(`Search completed with ${results.length} result(s).`);
    for (const result of results) {
      console.log(`Resource name: ${result.relativeResourceName}`);
      console.log(`Result type: ${result.searchResultType}`);
      console.log(`Linked resource: ${result.linkedResource}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid search argument:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to search catalog:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Target resource not found:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { searchCatalog };
// [END datacatalog_v1_datacatalog_catalog_search]
