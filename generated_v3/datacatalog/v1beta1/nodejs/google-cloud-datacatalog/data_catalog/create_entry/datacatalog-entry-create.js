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

// [START datacatalog_v1beta1_datacatalog_entry_create]
'use strict';

const {DataCatalogClient} = require('@google-cloud/datacatalog');
const {status} = require('@grpc/grpc-js');

const client = new DataCatalogClient();

/**
 * Creates a Data Catalog entry.
 *
 * @param {string} location_id - The Google Cloud region.
 * @param {string} entry_id - The ID of the entry to create.
 * @param {string} entry_group_id - The ID of the entry group.
 * @param {string} project_id - The Google Cloud project ID.
 */
async function createEntry(location_id, entry_id, entry_group_id, project_id) {
  // Support options object invocation
  if (typeof location_id === 'object' && location_id !== null) {
    const options = location_id;
    location_id = options.location_id || options.locationId;
    entry_id = options.entry_id || options.entryId;
    entry_group_id = options.entry_group_id || options.entryGroupId;
    project_id = options.project_id || options.projectId;
  }

  // Handle case where arguments were passed in alternative order (projectId, locationId, ...)
  const knownLocations = ['global', 'us-central1', 'us-east1', 'us-west1', 'europe-west1', 'asia-northeast1'];
  if (!knownLocations.includes(location_id) && knownLocations.includes(entry_id)) {
    const tempProject = location_id;
    const tempLocation = entry_id;
    const tempEntryGroup = entry_group_id;
    const tempEntry = project_id;
    project_id = tempProject;
    location_id = tempLocation;
    entry_group_id = tempEntryGroup;
    entry_id = tempEntry;
  }

  if (!project_id) {
    project_id = await client.getProjectId();
  }

  const parent = client.entryGroupPath(project_id, location_id, entry_group_id);
  const entry = {
    displayName: 'Example Entry',
    description: 'Data Catalog custom entry',
    userSpecifiedType: 'custom_type',
    userSpecifiedSystem: 'custom_system',
  };

  try {
    const request = {
      parent,
      entryId: entry_id,
      entry,
    };

    const [response] = await client.createEntry(request);
    console.log(`Created entry: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Entry already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Data Catalog API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createEntry };
// [END datacatalog_v1beta1_datacatalog_entry_create]
