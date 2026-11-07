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

// [START analyticshub_v1beta1_analyticshubservice_dataexchange_get]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Use the getDataExchange method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the data exchange.
 * @param {string} locationId - The Google Cloud location or region of the data exchange (for example, "us" or "us-central1").
 * @param {string} dataExchangeId - The identifier of the data exchange to retrieve.
 */
async function getDataExchange(projectId, locationId, dataExchangeId) {
  const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;

  try {
    const request = {
      name,
    };

    const [dataExchange] = await client.getDataExchange(request);

    console.log(`Data exchange retrieved: ${dataExchange.name}`);
    console.log(`Display name: ${dataExchange.displayName}`);
    console.log(`Description: ${dataExchange.description}`);
    console.log(`Listing count: ${dataExchange.listingCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data exchange not found at: ${name}`);
      return;
    }
    console.error(`Error retrieving data exchange: ${err.message}`);
    throw err;
  }
}

module.exports = { getDataExchange };
// [END analyticshub_v1beta1_analyticshubservice_dataexchange_get]
