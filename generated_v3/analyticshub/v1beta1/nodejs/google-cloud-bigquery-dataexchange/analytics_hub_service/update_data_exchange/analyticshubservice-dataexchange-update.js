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

// [START analyticshub_v1beta1_analyticshubservice_dataexchange_update]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Use the updateDataExchange method
 *
 * @param {string} projectId - The Google Cloud project ID where the data exchange resides.
 * @param {string} locationId - The geographic location of the data exchange (e.g., 'US' or 'us-central1').
 * @param {string} dataExchangeId - The caller-chosen resource ID of the existing data exchange.
 */
async function updateDataExchange(projectId, locationId, dataExchangeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const updateMask = {
      paths: ['description'],
    };
    const dataExchange = {
      name,
      description: 'Updated description for data exchange',
    };

    const request = {
      updateMask,
      dataExchange,
    };

    const [response] = await client.updateDataExchange(request);

    console.log(`Updated data exchange: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Data exchange not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateDataExchange };
// [END analyticshub_v1beta1_analyticshubservice_dataexchange_update]
