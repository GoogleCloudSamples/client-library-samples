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

// [START dataplex_v1_catalogservice_entrylink_create]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new CatalogServiceClient();

/**
 * Use the createEntryLink method
 *
 * @param {string} locationId - The Google Cloud region where the EntryGroup is located (for example, 'us-central1').
 * @param {string} entryGroupId - The identifier of the parent EntryGroup (for example, 'test-entry-group').
 * @param {string} entryLinkId - The caller-chosen identifier for the EntryLink. Must start with a letter, end with a letter or number, contain only lowercase letters, numbers, and hyphens, and be between 1 and 63 characters (for example, 'custom-entry-link-1').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createEntryLink(locationId, entryGroupId, entryLinkId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}`;
    const entryLink = {
      entryLinkType:
        'projects/dataplex-types/locations/global/entryLinkTypes/related',
      entryReferences: [
        {
          type: 'SOURCE',
          entry: `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}/entries/example-source-entry`,
        },
        {
          type: 'TARGET',
          entry: `projects/${projectId}/locations/${locationId}/entryGroups/${entryGroupId}/entries/example-target-entry`,
        },
      ],
    };

    const request = {
      parent,
      entryLinkId,
      entryLink,
    };

    const [response] = await client.createEntryLink(request);
    console.log(`Created entry link: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Entry link already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { createEntryLink };
// [END dataplex_v1_catalogservice_entrylink_create]
