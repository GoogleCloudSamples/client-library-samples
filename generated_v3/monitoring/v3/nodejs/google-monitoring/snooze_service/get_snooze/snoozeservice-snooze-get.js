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

// [START monitoring_v3_snoozeservice_snooze_get]
'use strict';

const {SnoozeServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new SnoozeServiceClient();

/**
 * Use the getSnooze method
 *
 * @param {string} snoozeId - The server-generated ID of the Snooze to retrieve.
 * @param {string} projectId - The Google Cloud project ID where the Snooze is located.
 */
async function getSnooze(snoozeId, projectId) {
  try {
    const name = `projects/${projectId}/snoozes/${snoozeId}`;
    const [snooze] = await client.getSnooze({name});

    console.log(`Retrieved snooze: ${snooze.name}`);
    console.log(`Display name: ${snooze.displayName}`);
    return snooze;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Snooze not found: projects/${projectId}/snoozes/${snoozeId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing snooze: projects/${projectId}/snoozes/${snoozeId}`);
    } else {
      console.error(`Failed to retrieve snooze: ${err.message}`);
    }
  }
}

module.exports = { getSnooze };
// [END monitoring_v3_snoozeservice_snooze_get]
