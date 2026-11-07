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

// [START eventarc_v1_eventarc_messagebuses_list]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the listMessageBuses method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1') where the message buses reside.
 */
async function listMessageBuses(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const [messageBuses] = await client.listMessageBuses({
      parent,
    });

    if (!messageBuses || messageBuses.length === 0) {
      console.log('No message buses found.');
      return;
    }

    for (const messageBus of messageBuses) {
      console.log(`Message bus: ${messageBus.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list message buses: ${err.message}`);
    }
  }
}

module.exports = { listMessageBuses };
// [END eventarc_v1_eventarc_messagebuses_list]
