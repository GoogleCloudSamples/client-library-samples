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

// [START analyticshub_v1_analyticshubservice_dataexchange_update]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Use the updateDataExchange method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the data exchange.
 * @param {string} locationId - The Google Cloud region or location for the data exchange (e.g., 'us').
 * @param {string} dataExchangeId - The ID of the data exchange to update. Must contain only Unicode letters, numbers (0-9), and underscores (_), max length 100 bytes.
 */
async function updateDataExchange(projectId, locationId, dataExchangeId) {
  try {
    // Populate the resource name to bind the target path and provide the fields to update.
    const dataExchange = {
      name: client.dataExchangePath(projectId, locationId, dataExchangeId),
      description: 'Updated Data Exchange description',
    };

    // Specify the field mask paths matching the fields to modify.
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      dataExchange,
      updateMask,
    };

    const [response] = await client.updateDataExchange(request);

    console.log(`Updated data exchange: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data exchange not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update data exchange: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateDataExchange };
// [END analyticshub_v1_analyticshubservice_dataexchange_update]
