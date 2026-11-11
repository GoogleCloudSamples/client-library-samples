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

// [START datastore_v1_datastoreadmin_index_get]
'use strict';

const {DatastoreAdminClient} = require('@google-cloud/datastore');
const {status} = require('@grpc/grpc-js');

const client = new DatastoreAdminClient();

/**
 * Gets the specified composite index from Cloud Datastore.
 */
async function getIndex() {
  try {
    const projectId = await client.getProjectId();

    // Acquire the target index identifier from the environment or list existing indexes.
    let indexId = process.env.INDEX_ID;
    if (!indexId) {
      const [indexes] = await client.listIndexes({projectId});
      if (indexes && indexes.length > 0) {
        indexId = indexes[0].indexId;
      }
    }

    if (!indexId) {
      console.log('No indexes found to retrieve.');
      return;
    }

    const request = {
      projectId,
      indexId,
    };

    const [index] = await client.getIndex(request);

    console.log(`Index ID: ${index.indexId}`);
    console.log(`Kind: ${index.kind}`);
    console.log(`State: ${index.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Index not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error retrieving index: ${err.message}`);
    }
  }
}

module.exports = { getIndex };
// [END datastore_v1_datastoreadmin_index_get]
