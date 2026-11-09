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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_get]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Use the getServiceConnectionToken method
 *
 * @param {string} projectId - The Google Cloud project ID containing the service connection token.
 * @param {string} locationId - The Google Cloud location (region or 'global') where the service connection token is located.
 * @param {string} serviceConnectionTokenId - The identifier of the ServiceConnectionToken to retrieve.
 */
async function getServiceConnectionToken(projectId, locationId, serviceConnectionTokenId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/serviceConnectionTokens/${serviceConnectionTokenId}`;

    const [response] = await client.getServiceConnectionToken({name});

    console.log(`Retrieved service connection token: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service connection token not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve service connection token: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getServiceConnectionToken };
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_get]
