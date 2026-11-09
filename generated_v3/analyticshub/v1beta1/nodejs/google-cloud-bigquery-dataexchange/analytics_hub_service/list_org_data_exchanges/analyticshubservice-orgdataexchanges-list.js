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

// [START analyticshub_v1beta1_analyticshubservice_orgdataexchanges_list]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-data-exchange');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Lists data exchanges within a Google Cloud organization.
 *
 * @param {string} organizationId - The Google Cloud organization ID from which to list data exchanges.
 * @param {string} locationId - The geographic location where the data exchanges reside.
 */
async function listOrgDataExchanges(organizationId, locationId) {
  try {
    const organization = `organizations/${organizationId}/locations/${locationId}`;
    const request = {
      organization,
    };

    const [dataExchanges] = await client.listOrgDataExchanges(request);

    for (const exchange of dataExchanges) {
      console.log(`Data exchange: ${exchange.name}`);
      console.log(`Display name: ${exchange.displayName}`);
      console.log(`Primary contact: ${exchange.primaryContact}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing data exchanges for ${organizationId}: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Organization or location not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listOrgDataExchanges };
// [END analyticshub_v1beta1_analyticshubservice_orgdataexchanges_list]
