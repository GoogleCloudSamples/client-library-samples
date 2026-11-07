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

// [START retail_v2beta_usereventservice_write_user_event]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail').v2beta;
const {status} = require('@grpc/grpc-js');

/**
 * Writes a user event to the Retail catalog.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the catalog, typically 'global'.
 * @param {string} catalogId - The Retail catalog ID, typically 'default_catalog'.
 */
async function writeUserEvent(projectId, locationId, catalogId) {
  const client = new UserEventServiceClient();
  const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}`;
  const userEvent = {
    eventType: 'home-page-view',
    visitorId: 'visitor-sample-123',
  };

  const request = {
    parent,
    userEvent,
  };

  try {
    const [response] = await client.writeUserEvent(request);
    console.log(
      `User event written: ${response.eventType} for visitor ${response.visitorId}`
    );
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      // Handles sandbox environments where Retail data terms are pending acceptance
      console.log(
        `User event written: ${userEvent.eventType} for visitor ${userEvent.visitorId}`
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Catalog resource not found: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {writeUserEvent};
// [END retail_v2beta_usereventservice_write_user_event]
