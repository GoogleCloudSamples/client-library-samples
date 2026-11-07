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

// [START analyticshub_v1_analyticshubservice_dataexchange_delete]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Deletes an existing data exchange.
 *
 * @param {string} projectId - The Google Cloud project ID containing the data exchange.
 * @param {string} locationId - The Google Cloud region or location where the data exchange resides (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The ID of the data exchange to delete.
 */
async function deleteDataExchange(projectId, locationId, dataExchangeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;

    const request = {
      name,
    };

    await client.deleteDataExchange(request);
    console.log(`Deleted data exchange: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data exchange not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete data exchange: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteDataExchange };
// [END analyticshub_v1_analyticshubservice_dataexchange_delete]
