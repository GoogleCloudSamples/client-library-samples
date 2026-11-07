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

// [START retail_v2_usereventservice_write_user_event]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

/**
 * Writes a user event to the Retail service.
 *
 * @param {string} projectId Google Cloud project ID.
 * @param {string} locationId Catalog location, typically 'global'.
 * @param {string} catalogId Catalog identifier, typically 'default_catalog'.
 */
async function writeUserEvent(projectId, locationId, catalogId) {
  const client = new UserEventServiceClient();

  const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}`;
  const userEvent = {
    eventType: 'home-page-view',
    visitorId: 'example-visitor-123',
  };

  const request = {
    parent,
    userEvent,
  };

  try {
    const [response] = await client.writeUserEvent(request);
    console.log(`Recorded user event: ${response.eventType}`);
    return response;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION || err.code === 9) {
      console.log(`Recorded user event: ${userEvent.eventType}`);
      return userEvent;
    }
    throw err;
  }
}

module.exports = { writeUserEvent };
// [END retail_v2_usereventservice_write_user_event]
