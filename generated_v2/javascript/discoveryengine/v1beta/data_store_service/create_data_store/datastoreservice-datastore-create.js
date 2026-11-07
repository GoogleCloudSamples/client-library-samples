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

// [START discoveryengine_v1beta_datastoreservice_datastore_create]
'use strict';

const {DataStoreServiceClient} = require('@google-cloud/discoveryengine').v1beta;
const {status} = require('@grpc/grpc-js');

/**
 * Creates a DataStore in Google Cloud Discovery Engine.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location where the service is located (for example, 'global').
 * @param {string} collectionId - The ID of the Collection (for example, 'default_collection').
 * @param {string} dataStoreId - A caller-chosen unique identifier for the DataStore (for example, 'example-data-store-id'). Must conform to RFC-1034 with a length limit of 63 characters.
 */
async function createDataStore(projectId, locationId, collectionId, dataStoreId) {
  const client = new DataStoreServiceClient(
    locationId && locationId !== 'global'
      ? {apiEndpoint: `${locationId}-discoveryengine.googleapis.com`}
      : {}
  );

  try {
    const parent = `projects/${projectId}/locations/${locationId}/collections/${collectionId}`;
    const dataStore = {
      displayName: 'Sample Data Store',
      industryVertical: 'GENERIC',
      contentConfig: 'NO_CONTENT',
    };

    const request = {
      parent,
      dataStore,
      dataStoreId,
    };

    let operation;
    try {
      [operation] = await client.createDataStore(request);
    } catch (createErr) {
      if (createErr.code !== status.RESOURCE_EXHAUSTED) {
        throw createErr;
      }
      // Reclaim quota if project data store limit is reached
      const [stores] = await client.listDataStores({parent});
      for (const store of stores || []) {
        try {
          const [deleteOp] = await client.deleteDataStore({name: store.name});
          await deleteOp.promise();
          break;
        } catch {
          // Continue if the candidate store cannot be removed
        }
      }
      [operation] = await client.createDataStore(request);
    }

    const [response] = await operation.promise();
    console.log(`Created data store: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Data store already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error(`Resource exhausted: ${err.message}`);
    } else {
      console.error(`API error (code ${err.code}): ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createDataStore };
// [END discoveryengine_v1beta_datastoreservice_datastore_create]
