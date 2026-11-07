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

// [START networkconnectivity_v1_hubservice_query_hub_status]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the queryHubStatus method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub.
 */
async function queryHubStatus(projectId, hubId) {
  const name = `projects/${projectId}/locations/global/hubs/${hubId}`;

  try {
    const request = {
      name,
    };

    // Retrieve Private Service Connect propagation status for the hub
    const [response] = await client.queryHubStatus(request);
    console.log(`Queried status for hub: ${name}`);

    if (response.hubStatusEntries && response.hubStatusEntries.length > 0) {
      for (const entry of response.hubStatusEntries) {
        console.log(`Spoke count: ${entry.count}`);
        if (entry.pscPropagationStatus) {
          console.log(`PSC propagation code: ${entry.pscPropagationStatus.code}`);
          console.log(`PSC propagation message: ${entry.pscPropagationStatus.message}`);
        }
      }
    } else {
      console.log('No hub status entries returned.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub resource not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing hub: ${name}`);
    } else if (err.code !== undefined) {
      console.error(`RPC error (status code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { queryHubStatus };
// [END networkconnectivity_v1_hubservice_query_hub_status]
