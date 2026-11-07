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

// [START retail_v2_usereventservice_import_user_events]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

/**
 * Imports user events into a catalog.
 *
 * @param {string} projectId - The Google Cloud project ID or number.
 * @param {string} locationId - The geographic location of the catalog, typically 'global'.
 * @param {string} catalogId - The catalog identifier, typically 'default_catalog'.
 */
async function importUserEvents(projectId, locationId, catalogId) {
  const client = new UserEventServiceClient();

  try {
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}`;

    const userEvent = {
      eventType: 'home-page-view',
      visitorId: 'example-visitor-id',
      eventTime: {
        seconds: Math.floor(Date.now() / 1000),
        nanos: 0,
      },
    };

    const userEventInlineSource = {
      userEvents: [userEvent],
    };

    const inputConfig = {
      userEventInlineSource,
    };

    const [operation] = await client.importUserEvents({
      parent,
      inputConfig,
    });

    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Import operation completed.');

    if (response.errorSamples && response.errorSamples.length > 0) {
      console.log(`Encountered ${response.errorSamples.length} error sample(s).`);
    } else {
      console.log('User events imported successfully.');
    }
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail data use terms have not been accepted in the Google Cloud console.'
      );
      return;
    }
    if (
      err.code === status.INVALID_ARGUMENT ||
      err.code === status.NOT_FOUND ||
      err.code === status.PERMISSION_DENIED
    ) {
      console.log(`Request completed with gRPC status: ${err.code}`);
      return;
    }
    throw err;
  }
}

module.exports = {importUserEvents};
// [END retail_v2_usereventservice_import_user_events]
