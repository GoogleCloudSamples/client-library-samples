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

// [START analyticshub_v1_analyticshubservice_listing_get]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Retrieves a listing from an Analytics Hub data exchange.
 *
 * @param {string} projectId - The Google Cloud project ID containing the data exchange and listing.
 * @param {string} locationId - The Google Cloud location or region of the data exchange (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The caller-chosen identifier of the data exchange containing the listing.
 * @param {string} listingId - The caller-chosen identifier of the listing to retrieve.
 */
async function getListing(projectId, locationId, dataExchangeId, listingId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}/listings/${listingId}`;

    const request = {
      name,
    };

    const [listing] = await client.getListing(request);

    console.log(`Listing name: ${listing.name}`);
    console.log(`Display name: ${listing.displayName}`);
    console.log(`State: ${listing.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Listing not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getListing };
// [END analyticshub_v1_analyticshubservice_listing_get]
