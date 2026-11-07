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

// [START analyticshub_v1beta1_analyticshubservice_dataexchange_create]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Creates a new data exchange in Analytics Hub.
 *
 * @param {string} dataExchangeId - Caller-specified ID for the data exchange.
 * @param {string} projectId - The Google Cloud project ID where the data exchange is created.
 * @param {string} locationId - The Google Cloud location for the data exchange (for example, 'us').
 */
async function createDataExchange(dataExchangeId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const dataExchange = {
      displayName: 'Example Data Exchange',
      description: 'Exchange for analytics data sharing',
    };

    const request = {
      parent,
      dataExchangeId,
      dataExchange,
    };

    const [response] = await client.createDataExchange(request);
    console.log(`Data exchange created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data exchange already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createDataExchange };
// [END analyticshub_v1beta1_analyticshubservice_dataexchange_create]
