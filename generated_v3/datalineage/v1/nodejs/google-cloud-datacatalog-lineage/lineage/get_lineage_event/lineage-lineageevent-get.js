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

// [START datalineage_v1_lineage_lineageevent_get]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the getLineageEvent method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region.
 * @param {string} processId - The identifier of the lineage process.
 * @param {string} runId - The identifier of the lineage run.
 * @param {string} lineageEventId - The identifier of the lineage event.
 */
async function getLineageEvent(projectId, locationId, processId, runId, lineageEventId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processes/${processId}/runs/${runId}/lineageEvents/${lineageEventId}`;

    const request = {
      name,
    };

    const [lineageEvent] = await client.getLineageEvent(request);
    console.log(`Retrieved lineage event: ${lineageEvent.name}`);
    return lineageEvent;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Lineage event was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing lineage event: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getLineageEvent };
// [END datalineage_v1_lineage_lineageevent_get]
