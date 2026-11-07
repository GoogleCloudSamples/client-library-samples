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

// [START analyticshub_v1_analyticshubservice_orgdataexchanges_list]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Lists data exchanges from an organization in BigQuery Analytics Hub.
 */
async function listOrgDataExchanges() {
  try {
    const organization = 'example-organization';
    const location = 'example-location';
    const orgLocation = `organizations/${organization}/locations/${location}`;

    const request = {
      organization: orgLocation,
    };

    const [dataExchanges] = await client.listOrgDataExchanges(request);

    console.log(`Retrieved ${dataExchanges.length} data exchange(s)`);
    for (const dataExchange of dataExchanges) {
      console.log(`Data exchange: ${dataExchange.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}):`, err.message);
    } else {
      throw err;
    }
  }
}

module.exports = { listOrgDataExchanges };
// [END analyticshub_v1_analyticshubservice_orgdataexchanges_list]
