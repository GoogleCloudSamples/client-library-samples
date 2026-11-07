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

// [START vision_v1_productsearch_import_product_sets]
'use strict';

const {ProductSearchClient} = require('@google-cloud/vision');
const {status} = require('@grpc/grpc-js');

/**
 * Imports product sets into Google Cloud Vision Product Search from a CSV file.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-west1').
 */
async function importProductSets(projectId, locationId) {
  const client = new ProductSearchClient();

  // Vision Product Search is supported in us-west1, us-east1, asia-east1, and europe-west1.
  const supportedLocations = ['us-west1', 'us-east1', 'asia-east1', 'europe-west1'];
  if (!supportedLocations.includes(locationId)) {
    locationId = 'us-west1';
  }

  try {
    const parent = client.locationPath(projectId, locationId);
    const gcsSource = {
      csvFileUri: 'gs://cloud-samples-data/vision/product_search/product_sets.csv',
    };
    const inputConfig = {
      gcsSource,
    };

    const request = {
      parent,
      inputConfig,
    };

    // ImportProductSets is a long-running operation.
    const [operation] = await client.importProductSets(request);
    console.log('Waiting for import operation to complete...');

    const [response] = await operation.promise();
    console.log('Import completed successfully.');

    if (response.referenceImages) {
      console.log(`Imported ${response.referenceImages.length} reference images.`);
    }
    if (response.statuses) {
      console.log(`Encountered ${response.statuses.length} status records.`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Operation failed:', err.message || err);
    }
    throw err;
  }
}

module.exports = { importProductSets };
// [END vision_v1_productsearch_import_product_sets]
