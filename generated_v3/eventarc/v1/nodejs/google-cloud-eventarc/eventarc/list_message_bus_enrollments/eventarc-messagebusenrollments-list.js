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

// [START eventarc_v1_eventarc_messagebusenrollments_list]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the listMessageBusEnrollments method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the MessageBus is located.
 * @param {string} messageBusId - The ID of the existing MessageBus whose enrollments are to be listed. Sourced from an existing MessageBus.
 */
async function listMessageBusEnrollments(projectId, locationId, messageBusId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/messageBuses/${messageBusId}`;
    const request = {
      parent,
    };

    const [enrollments] = await client.listMessageBusEnrollments(request);

    console.log(`Found ${enrollments.length} enrollment(s):`);
    for (const enrollment of enrollments) {
      console.log(`- ${enrollment}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`MessageBus not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error listing message bus enrollments: ${err.message}`);
    }
  }
}

module.exports = { listMessageBusEnrollments };
// [END eventarc_v1_eventarc_messagebusenrollments_list]
