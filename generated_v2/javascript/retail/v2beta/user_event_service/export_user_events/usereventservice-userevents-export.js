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

// [START retail_v2beta_usereventservice_export_user_events]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail').v2beta;
const {status} = require('@grpc/grpc-js');

const client = new UserEventServiceClient();

/**
 * Exports user events to Cloud Storage.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Geographic location of the catalog, typically 'global'.
 * @param {string} catalogId - ID of the Retail catalog, typically 'default_catalog'.
 */
async function exportUserEvents(projectId, locationId, catalogId) {
  try {
    const outputConfig = {
      gcsDestination: {
        outputUriPrefix: 'gs://example-bucket-name/export/',
      },
    };
    const parent = `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}`;

    const request = {
      parent,
      outputConfig,
    };

    // ExportUserEvents is a long-running operation; await completion.
    const [operation] = await client.exportUserEvents(request);
    const [response] = await operation.promise();

    console.log('User events export completed successfully.');
    console.log(`Operation result: ${JSON.stringify(response)}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail is not enabled or data terms are not accepted for this project.'
      );
    } else if (err.code === status.NOT_FOUND) {
      console.log('The requested catalog or resource was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log('Access to the Retail catalog was not granted.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log('An invalid argument was provided for the export request.');
    } else {
      throw err;
    }
  }
}

module.exports = {exportUserEvents};
// [END retail_v2beta_usereventservice_export_user_events]
