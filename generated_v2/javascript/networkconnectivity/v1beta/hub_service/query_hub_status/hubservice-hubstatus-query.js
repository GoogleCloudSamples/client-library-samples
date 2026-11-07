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

// [START networkconnectivity_v1beta_hubservice_query_hub_status]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the queryHubStatus method
 *
 * @param {string} projectId - The ID of the Google Cloud project hosting the Network Connectivity Center hub.
 * @param {string} hubId - The caller-chosen identifier of the Network Connectivity Center hub.
 */
async function queryHubStatus(projectId, hubId) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}`;
    const request = {
      name,
    };

    const [response] = await client.queryHubStatus(request);
    console.log(`Hub status retrieved for: ${name}`);
    console.log(response);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
  }
}

module.exports = { queryHubStatus };
// [END networkconnectivity_v1beta_hubservice_query_hub_status]
