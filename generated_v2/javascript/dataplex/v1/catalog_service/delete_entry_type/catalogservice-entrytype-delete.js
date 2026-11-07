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

// [START dataplex_v1_catalogservice_entrytype_delete]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Use the deleteEntryType method
 *
 * @param {string} locationId - The Google Cloud region or 'global' where the EntryType is located (for example, 'us-central1' or 'global').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} entryTypeId - The ID of the EntryType to delete. This is caller-specified upon creation.
 */
async function deleteEntryType(locationId, projectId, entryTypeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/entryTypes/${entryTypeId}`;

    const [operation] = await client.deleteEntryType({name});
    await operation.promise();

    console.log(`Deleted entry type: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entry type not found: projects/${projectId}/locations/${locationId}/entryTypes/${entryTypeId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteEntryType };
// [END dataplex_v1_catalogservice_entrytype_delete]
