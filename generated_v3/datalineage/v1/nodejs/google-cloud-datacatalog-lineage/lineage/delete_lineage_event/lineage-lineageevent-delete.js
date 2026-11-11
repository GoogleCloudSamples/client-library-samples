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

// [START datalineage_v1_lineage_lineageevent_delete]
'use strict';

const {LineageClient} = require('@google-cloud/lineage');
const {status} = require('@grpc/grpc-js');

const client = new LineageClient();

/**
 * Use the deleteLineageEvent method
 *
 * @param {string} projectId - The Google Cloud project ID where the lineage event is located.
 * @param {string} locationId - The Google Cloud region or location for the lineage event.
 * @param {string} processId - The ID of the parent lineage process. Can be caller-specified or server-generated. Must not exceed 200 characters and contain only characters [a-zA-Z0-9_-:.].
 * @param {string} runId - The ID of the parent lineage run. Can be caller-specified or server-generated. Must not exceed 200 characters and contain only characters [a-zA-Z0-9_-:.].
 * @param {string} lineageEventId - The ID of the lineage event to delete. Can be caller-specified or server-generated. Must not exceed 200 characters and contain only characters [a-zA-Z0-9_-:.].
 */
async function deleteLineageEvent(projectId, locationId, processId, runId, lineageEventId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/processes/${processId}/runs/${runId}/lineageEvents/${lineageEventId}`;

    const request = {
      name,
    };

    await client.deleteLineageEvent(request);
    console.log(`Deleted lineage event: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Lineage event not found.');
    } else {
      console.error(`Failed to delete lineage event: ${err.message}`);
    }
  }
}

module.exports = { deleteLineageEvent };
// [END datalineage_v1_lineage_lineageevent_delete]
