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

// [START discoveryengine_v1_usereventservice_purge_user_events]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new UserEventServiceClient();

/**
 * Purges user events from a data store.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} collectionId - The ID of the Collection (for example, 'default_collection').
 * @param {string} dataStoreId - The ID of the DataStore (for example, 'example-datastore-id').
 */
async function purgeUserEvents(projectId, collectionId, dataStoreId) {
  try {
    // Purge requests enforce a maximum 30-day time range.
    const purgeWindowStart = new Date(
      Date.now() - 29 * 24 * 60 * 60 * 1000
    ).toISOString();
    const filter = `eventTime > "${purgeWindowStart}"`;
    const parent = `projects/${projectId}/locations/global/collections/${collectionId}/dataStores/${dataStoreId}`;

    const request = {
      parent,
      filter,
      force: true,
    };

    // PurgeUserEvents is a long-running operation; wait for it to complete
    const [operation] = await client.purgeUserEvents(request);
    const [response] = await operation.promise();

    console.log(`Purged user events count: ${response.purgeCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = {purgeUserEvents};
// [END discoveryengine_v1_usereventservice_purge_user_events]
