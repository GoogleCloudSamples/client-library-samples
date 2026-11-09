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

// [START dataplex_v1_catalogservice_entrygroup_get]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Retrieves a Dataplex entry group.
 *
 * @param {string} locationId - The Google Cloud region or location for the entry group (for example, 'us-central1').
 * @param {string} entryGroupId - The identifier of the entry group to retrieve (for example, 'example-entry-group').
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function getEntryGroup(locationId, entryGroupId, projectId) {
  const name = `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}`;

  try {
    const request = {
      name,
    };

    const [entryGroup] = await client.getEntryGroup(request);

    console.log(`Entry group name: ${entryGroup.name}`);
    console.log(`Display name: ${entryGroup.displayName || 'None'}`);
    console.log(`Description: ${entryGroup.description || 'None'}`);
    return entryGroup;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Entry group not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing entry group: ${name}`);
    } else {
      console.error(`Error retrieving entry group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEntryGroup };
// [END dataplex_v1_catalogservice_entrygroup_get]
