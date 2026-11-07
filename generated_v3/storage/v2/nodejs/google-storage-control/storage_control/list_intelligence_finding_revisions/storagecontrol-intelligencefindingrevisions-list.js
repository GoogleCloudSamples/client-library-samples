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

// [START storage_v2_storagecontrol_intelligencefindingrevisions_list]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Lists revisions of a specified Storage Intelligence finding.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region for Storage Intelligence (for example, 'global').
 * @param {string} intelligenceFindingId - The server-generated ID of the intelligence finding (for example, 'example-intelligence-finding-id').
 */
async function listIntelligenceFindingRevisions(projectId, locationId, intelligenceFindingId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/intelligenceFindings/${intelligenceFindingId}`;
    const request = {
      parent,
    };

    const [revisions] = await client.listIntelligenceFindingRevisions(request);

    console.log(`Listed ${revisions.length} revision(s) for ${parent}.`);
    for (const revision of revisions) {
      console.log(`Revision name: ${revision.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listIntelligenceFindingRevisions };
// [END storage_v2_storagecontrol_intelligencefindingrevisions_list]
