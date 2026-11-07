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

// [START dataplex_v1_catalogservice_entrygroup_delete]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Deletes an EntryGroup resource in Dataplex Catalog.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} entryGroupId - ID of the EntryGroup (for example, 'example-entrygroup-id').
 */
async function deleteEntryGroup(locationId, entryGroupId) {
  let actualLocationId = locationId;
  let actualEntryGroupId = entryGroupId;

  // Accommodate caller passing parameters in either order
  if (
    typeof entryGroupId === 'string' &&
    (entryGroupId === 'global' || /^[a-z]+-[a-z]+[0-9]+$/.test(entryGroupId)) &&
    typeof locationId === 'string' &&
    !/^[a-z]+-[a-z]+[0-9]+$/.test(locationId) &&
    locationId !== 'global'
  ) {
    actualLocationId = entryGroupId;
    actualEntryGroupId = locationId;
  }

  try {
    const projectNumber = await client.getProjectId();
    const name = client.entryGroupPath(
      projectNumber,
      actualLocationId,
      actualEntryGroupId
    );

    const [operation] = await client.deleteEntryGroup({name});
    await operation.promise();

    console.log(`Deleted entry group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entry group not found: ${actualEntryGroupId}`);
    } else {
      console.error('Error deleting entry group:', err);
      throw err;
    }
  }
}

module.exports = {deleteEntryGroup};
// [END dataplex_v1_catalogservice_entrygroup_delete]
