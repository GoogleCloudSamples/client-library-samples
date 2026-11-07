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

// [START analyticshub_v1_analyticshubservice_dataexchange_get]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Use the getDataExchange method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the data exchange.
 * @param {string} dataExchangeId - The caller-specified ID of the data exchange.
 */
async function getDataExchange(projectId, locationId, dataExchangeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const request = {
      name,
    };

    const [response] = await client.getDataExchange(request);

    console.log(`Retrieved data exchange: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data exchange not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve data exchange: ${err.message}`);
    }
  }
}

module.exports = { getDataExchange };
// [END analyticshub_v1_analyticshubservice_dataexchange_get]
