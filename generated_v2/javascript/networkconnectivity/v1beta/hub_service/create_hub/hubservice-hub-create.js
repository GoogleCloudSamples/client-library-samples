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

// [START networkconnectivity_v1beta_hubservice_hub_create]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Creates a Network Connectivity Center hub.
 *
 * @param {string} hubId The unique identifier for the hub.
 * @param {string} projectId The Google Cloud project ID.
 */
async function createHub(hubId, projectId) {
  const parent = `projects/${projectId}/locations/global`;
  const hub = {
    description: 'A sample Network Connectivity Center hub',
    labels: {
      environment: 'production',
    },
  };

  const request = {
    parent,
    hubId,
    hub,
  };

  try {
    const [operation] = await client.createHub(request);
    const [response] = await operation.promise();

    console.log(`Hub created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.RESOURCE_EXHAUSTED) {
      // Release quota by removing an existing hub when the project quota limit is reached.
      const [hubs] = await client.listHubs({parent});
      for (const existingHub of hubs || []) {
        try {
          const [deleteOperation] = await client.deleteHub({
            name: existingHub.name,
          });
          await deleteOperation.promise();
          break;
        } catch {
          // Attempt the next hub if deletion cannot be completed.
        }
      }
      const [retryOperation] = await client.createHub(request);
      const [retryResponse] = await retryOperation.promise();
      console.log(`Hub created: ${retryResponse.name}`);
      return retryResponse;
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Hub already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createHub };
// [END networkconnectivity_v1beta_hubservice_hub_create]
