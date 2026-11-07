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

// [START discoveryengine_v1_engineservice_engine_delete]
'use strict';

const {EngineServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new EngineServiceClient();

/**
 * Use the deleteEngine method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} collectionId - ID of the Collection (for example, 'example-collection-id')
 * @param {string} engineId - ID of the Engine (for example, 'example-engine-id')
 */
async function deleteEngine(projectId, locationId, collectionId, engineId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/collections/${collectionId}/engines/${engineId}`;

    const [operation] = await client.deleteEngine({
      name,
    });

    // Wait for the long-running operation to complete.
    await operation.promise();

    console.log(`Deleted engine: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Engine not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Operation failed with gRPC status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteEngine };
// [END discoveryengine_v1_engineservice_engine_delete]
