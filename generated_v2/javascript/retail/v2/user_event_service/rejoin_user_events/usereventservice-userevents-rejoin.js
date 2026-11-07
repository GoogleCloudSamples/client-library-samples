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

// [START retail_v2_usereventservice_rejoin_user_events]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

/**
 * Rejoins user events missing product details to the catalog.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location where the catalog resides, typically 'global'.
 * @param {string} catalogId - The catalog ID, typically 'default_catalog'.
 */
async function rejoinUserEvents(projectId, locationId, catalogId) {
  const client = new UserEventServiceClient();

  const parent = client.catalogPath(projectId, locationId, catalogId);
  const userEventRejoinScope = 'UNJOINED_EVENTS';

  const request = {
    parent,
    userEventRejoinScope,
  };

  try {
    const [operation] = await client.rejoinUserEvents(request);
    const [response] = await operation.promise();

    console.log(`Rejoined user events count: ${response.rejoinedUserEventsCount}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log('Rejoined user events count: 0');
    } else {
      throw err;
    }
  }
}

module.exports = { rejoinUserEvents };
// [END retail_v2_usereventservice_rejoin_user_events]
