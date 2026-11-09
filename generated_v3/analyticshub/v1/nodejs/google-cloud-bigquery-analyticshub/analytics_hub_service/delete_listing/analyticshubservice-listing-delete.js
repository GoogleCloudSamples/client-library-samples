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

// [START analyticshub_v1_analyticshubservice_listing_delete]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Deletes a listing from a data exchange.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The geographic location of the listing and data exchange (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - The caller-specified ID of the parent data exchange.
 * @param {string} listingId - The caller-specified ID of the listing to delete.
 */
async function deleteListing(projectId, locationId, dataExchangeId, listingId) {
  const name = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}/listings/${listingId}`;

  try {
    const request = {
      name,
    };

    await client.deleteListing(request);
    console.log(`Deleted listing: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Listing not found: ${name}`);
    } else {
      console.error(`Failed to delete listing: ${err.message}`);
    }
  }
}

module.exports = { deleteListing };
// [END analyticshub_v1_analyticshubservice_listing_delete]
