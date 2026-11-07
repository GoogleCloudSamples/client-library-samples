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

// [START datalineage_v1_lineage_links_search]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Searches for lineage links associated with a specified entity.
 */
async function searchLinks() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
      source: {
        fullyQualifiedName: `bigquery:${projectId}.example_dataset.example_table`,
      },
    };

    const [links] = await client.searchLinks(request);

    console.log(`Found ${links.length} lineage link(s):`);
    for (const link of links) {
      console.log(`Link name: ${link.name}`);
      console.log(`  Source: ${link.source?.fullyQualifiedName}`);
      console.log(`  Target: ${link.target?.fullyQualifiedName}`);
      console.log(`  Start time: ${link.startTime?.seconds}`);
      console.log(`  End time: ${link.endTime?.seconds}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Search links request failed: ${err.message || err}`);
    }
  }
}

module.exports = {searchLinks};
// [END datalineage_v1_lineage_links_search]
