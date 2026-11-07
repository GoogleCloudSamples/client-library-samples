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

// [START analyticshub_v1_analyticshubservice_listing_create]
'use strict';

const {AnalyticsHubServiceClient} = require('@google-cloud/bigquery-analyticshub');
const {status} = require('@grpc/grpc-js');

const client = new AnalyticsHubServiceClient();

/**
 * Creates a listing in a data exchange to share a BigQuery dataset.
 *
 * @param {string} listingId - The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes.
 * @param {string} projectId - Google Cloud project ID where the data exchange resides.
 * @param {string} locationId - Location of the data exchange and listing (for example, 'us' or 'us-central1').
 * @param {string} dataExchangeId - ID of the parent data exchange where the listing will be created.
 * @param {string} datasetId - ID of the existing BigQuery dataset to be published as a listing.
 */
async function createListing(listingId, projectId, locationId, dataExchangeId, datasetId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/dataExchanges/${dataExchangeId}`;
    const listing = {
      displayName: 'Example Listing',
      bigqueryDataset: {
        dataset: `projects/${projectId}/datasets/${datasetId}`,
      },
    };

    const request = {
      parent,
      listingId,
      listing,
    };

    const [response] = await client.createListing(request);
    console.log(`Created listing: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Listing ${listingId} already exists.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified parent resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating listing: ${err.message}`);
    } else {
      console.error(`Failed to create listing: ${err.message}`);
    }
  }
}

module.exports = { createListing };
// [END analyticshub_v1_analyticshubservice_listing_create]
