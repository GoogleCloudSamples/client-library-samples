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

// [START vectorsearch_v1_vectorsearchservice_collections_list]
'use strict';

const {VectorSearchServiceClient} = require('@google-cloud/vectorsearch');
const {status} = require('@grpc/grpc-js');

const client = new VectorSearchServiceClient();

/**
 * Lists Vector Search collections in a given project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function listCollections(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [collections] = await client.listCollections(request);

    for (const collection of collections) {
      console.log(`Collection: ${collection.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API RPC error (status code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listCollections };
// [END vectorsearch_v1_vectorsearchservice_collections_list]
