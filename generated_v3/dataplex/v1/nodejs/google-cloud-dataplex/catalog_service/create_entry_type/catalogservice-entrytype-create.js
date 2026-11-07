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

// [START dataplex_v1_catalogservice_entrytype_create]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Creates an EntryType in Google Cloud Dataplex.
 *
 * @param {string} locationId - Google Cloud region (for example, 'us-central1')
 * @param {string} entryTypeId - Entry type identifier (for example, 'example-entrytype-id')
 */
async function createEntryType(locationId, entryTypeId) {
  try {
    const projectNumber = await client.getProjectId();
    const parent = client.locationPath(projectNumber, locationId);
    const entryType = {
      description: 'Custom entry type for data cataloging',
    };

    const [operation] = await client.createEntryType({
      parent,
      entryTypeId,
      entryType,
    });
    const [response] = await operation.promise();

    console.log(`Entry type created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Entry type already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error creating entry type: ${err.message}`);
    }
  }
}

module.exports = { createEntryType };
// [END dataplex_v1_catalogservice_entrytype_create]
