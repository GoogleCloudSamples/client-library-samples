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

// [START dataplex_v1_catalogservice_entrytype_get]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Retrieves an EntryType resource from Dataplex Catalog.
 *
 * @param {string} locationId - The Google Cloud location of the EntryType (for example, 'us-central1' or 'global').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} entryTypeId - The ID of the EntryType to retrieve.
 */
async function getEntryType(locationId, projectId, entryTypeId) {
  const name = `projects/${projectId}/locations/${locationId}/entryTypes/${entryTypeId}`;

  try {
    const request = {
      name,
    };

    const [entryType] = await client.getEntryType(request);

    console.log(`Retrieved entry type: ${entryType.name}`);
    console.log(`Display name: ${entryType.displayName}`);
    return entryType;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entry type not found at: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing: ${name}`);
    } else {
      console.error(`RPC failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEntryType };
// [END dataplex_v1_catalogservice_entrytype_get]
