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

// [START dataplex_v1_catalogservice_entrygroup_create]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Creates a Dataplex EntryGroup.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} entryGroupId - ID of the EntryGroup (for example, 'example-entrygroup-id')
 */
async function createEntryGroup(locationId, entryGroupId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = client.locationPath(projectNumber, locationId);
    const entryGroup = {
      displayName: 'Example Entry Group',
      description: 'An example entry group for Dataplex Catalog',
    };

    const request = {
      parent,
      entryGroupId,
      entryGroup,
    };

    const [operation] = await client.createEntryGroup(request);
    const [response] = await operation.promise();

    console.log(`Created entry group: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Entry group ${entryGroupId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating entry group: ${err.message}`);
    } else {
      console.error(`Failed to create entry group: ${err.message}`);
    }
  }
}

module.exports = { createEntryGroup };
// [END dataplex_v1_catalogservice_entrygroup_create]
