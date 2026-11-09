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

// [START servicehealth_v1_servicehealth_event_get]
'use strict';

const {ServiceHealthClient} = require('@google-cloud/servicehealth');
const {status} = require('@grpc/grpc-js');

const client = new ServiceHealthClient();

/**
 * Retrieves a specific Service Health event.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 * @param {string} eventId - The server-generated identifier of the service health event.
 */
async function getEvent(projectId, locationId, eventId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/events/${eventId}`;
    const request = {
      name,
    };

    const [event] = await client.getEvent(request);

    console.log(`Event: ${event.name}`);
    console.log(`Title: ${event.title}`);
    console.log(`State: ${event.state}`);
    console.log(`Detailed State: ${event.detailedState}`);
    return event;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Requested event not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing event: ${err.message}`);
    } else {
      console.error(`Google API error retrieving event: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEvent };
// [END servicehealth_v1_servicehealth_event_get]
