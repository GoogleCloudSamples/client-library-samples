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

// [START analyticshub_v1_analyticshubservice_dataexchange_create]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Use the createDataExchange method
 *
 * @param {string} dataExchangeId - ID of the data exchange to create. Must contain only letters, numbers, and underscores (e.g., 'example_data_exchange'). Max length: 100 bytes.
 * @param {string} projectId - Google Cloud project ID where the data exchange will be created.
 * @param {string} locationId - Geographic location of the data exchange (e.g., 'us' or 'us-central1').
 */
async function createDataExchange(dataExchangeId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const dataExchange = {
      displayName: 'Example Data Exchange',
      description: 'Analytics Hub data exchange for dataset sharing',
    };

    const request = {
      parent,
      dataExchangeId,
      dataExchange,
    };

    const [response] = await client.createDataExchange(request);
    console.log(`Created data exchange: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data exchange already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create data exchange: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createDataExchange };
// [END analyticshub_v1_analyticshubservice_dataexchange_create]
