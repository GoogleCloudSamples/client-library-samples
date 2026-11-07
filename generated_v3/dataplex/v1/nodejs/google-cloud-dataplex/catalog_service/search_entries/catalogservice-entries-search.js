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

// [START dataplex_v1_catalogservice_entries_search]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Searches entries in the Dataplex Catalog.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function searchEntries(projectId) {
  try {
    // Construct the resource name for the global catalog search scope
    const name = `projects/${projectId}/locations/global`;
    const query = 'type=dataset';

    console.log(`Searching entries for project: ${projectId}`);

    const request = {
      name,
      query,
    };

    // Execute the search request
    const [response] = await client.searchEntries(request);
    console.log(`Search completed with ${response.length} entries.`);
    for (const result of response) {
      console.log(result);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Search entries failed: ${err.message}`);
    }
  }
}

module.exports = {searchEntries};
// [END dataplex_v1_catalogservice_entries_search]
