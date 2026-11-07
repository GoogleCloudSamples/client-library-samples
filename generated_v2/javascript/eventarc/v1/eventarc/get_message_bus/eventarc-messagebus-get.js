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

// [START eventarc_v1_eventarc_messagebus_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the getMessageBus method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the message bus.
 * @param {string} messageBusId - The ID of the message bus to retrieve. This is caller-chosen upon creation, conforming to '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'.
 */
async function getMessageBus(projectId, locationId, messageBusId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/messageBuses/${messageBusId}`;

    const request = {
      name,
    };

    const [response] = await client.getMessageBus(request);

    console.log(`Retrieved message bus: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Message bus not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while retrieving message bus: ${err.message}`);
    } else {
      console.error(`Failed to retrieve message bus: ${err.message}`);
    }
  }
}

module.exports = { getMessageBus };
// [END eventarc_v1_eventarc_messagebus_get]
