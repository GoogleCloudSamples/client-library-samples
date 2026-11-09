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

// [START dataplex_v1_catalogservice_lookup_entry]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Use the lookupEntry method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} entryGroupId - ID of the EntryGroup (for example, 'example-entrygroup-id')
 * @param {string} entryId - ID of the Entry (for example, 'example-entry-id')
 */
async function lookupEntry(projectId, locationId, entryGroupId, entryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}`;
    const entry = `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}/entries/${entryId}`;

    const request = {
      name,
      entry,
    };

    const [response] = await client.lookupEntry(request);
    console.log(`Successfully looked up entry: ${response.name}`);
    console.log(`Entry type: ${response.entryType}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entry not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while looking up entry: ${err.message}`);
    } else {
      console.error(`API error looking up entry: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { lookupEntry };
// [END dataplex_v1_catalogservice_lookup_entry]
