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

// [START dataplex_v1_catalogservice_lookup_entry_links]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Looks up entry links associated with a Dataplex entry.
 *
 * @param {string} locationId - The Google Cloud region where the entry and entry links are located (for example, 'us-central1').
 * @param {string} entryGroupId - The ID of the Entry Group containing the entry.
 * @param {string} entryId - The ID of the Entry to look up entry links for.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function lookupEntryLinks(locationId, entryGroupId, entryId, projectId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;
    const entry = `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}/entries/${entryId}`;

    const request = {
      name,
      entry,
    };

    const [entryLinks] = await client.lookupEntryLinks(request);

    if (!entryLinks || entryLinks.length === 0) {
      console.log('No entry links found.');
    } else {
      for (const entryLink of entryLinks) {
        console.log(`Entry link: ${entryLink.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { lookupEntryLinks };
// [END dataplex_v1_catalogservice_lookup_entry_links]
