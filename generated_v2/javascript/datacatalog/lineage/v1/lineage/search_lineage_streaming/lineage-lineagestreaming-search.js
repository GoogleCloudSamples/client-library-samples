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

// [START datalineage_v1_lineage_lineagestreaming_search]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Searches lineage events and links matching criteria via streaming.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID.
 */
async function searchLineageStreaming(projectId, locationId) {
  try {
    const locations = [locationId];
    const parent = `projects/${projectId}/locations/${locationId}`;
    const rootCriteria = {
      entities: {
        entities: [
          {
            fullyQualifiedName: `bigquery:${projectId}.demo_dataset.demo_table`,
          },
        ],
      },
    };
    const direction = 'DOWNSTREAM';

    const request = {
      parent,
      locations,
      rootCriteria,
      direction,
    };

    console.log(`Searching lineage for parent: ${parent}`);
    const stream = client.searchLineageStreaming(request);

    let resultCount = 0;
    for await (const response of stream) {
      console.log('Received lineage response:', JSON.stringify(response));
      resultCount++;
    }

    console.log(`Lineage search completed. Found ${resultCount} results.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Lineage resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing lineage:', err.message);
    } else if (err.code !== undefined) {
      console.error(`Google API error [${err.code}]:`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { searchLineageStreaming };
// [END datalineage_v1_lineage_lineagestreaming_search]
