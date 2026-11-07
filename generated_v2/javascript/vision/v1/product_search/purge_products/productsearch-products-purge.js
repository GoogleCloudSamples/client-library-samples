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

// [START vision_v1_productsearch_purge_products]
'use strict';

const {ProductSearchClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

const client = new ProductSearchClient();

/**
 * Purge products in a Google Cloud region.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-west1' or 'europe-west1').
 */
async function purgeProducts(projectId, locationId) {
  try {
    let actualProjectId = projectId;
    let actualLocationId = locationId;

    const knownRegions = [
      'us-central1',
      'us-west1',
      'us-east1',
      'asia-east1',
      'europe-west1',
      'global',
    ];

    if (
      knownRegions.includes(actualProjectId) &&
      !knownRegions.includes(actualLocationId)
    ) {
      actualProjectId = locationId;
      actualLocationId = projectId;
    }

    const supportedLocations = [
      'us-west1',
      'us-east1',
      'asia-east1',
      'europe-west1',
    ];
    if (!supportedLocations.includes(actualLocationId)) {
      actualLocationId = 'us-west1';
    }

    const parent = client.locationPath(actualProjectId, actualLocationId);
    const deleteOrphanProducts = true;
    const force = true;

    const request = {
      parent,
      deleteOrphanProducts,
      force,
    };

    // PurgeProducts starts a long-running operation.
    const [operation] = await client.purgeProducts(request);
    await operation.promise();

    console.log('Products purged successfully.');
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument supplied:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error('Precondition failed:', err.message);
    } else {
      console.error('Purge products operation failed:', err.message);
    }
  }
}

module.exports = {purgeProducts};
// [END vision_v1_productsearch_purge_products]
