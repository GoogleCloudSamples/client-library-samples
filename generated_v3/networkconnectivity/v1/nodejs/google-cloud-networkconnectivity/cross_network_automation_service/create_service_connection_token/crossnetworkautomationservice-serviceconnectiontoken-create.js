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

// [START networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]
'use strict';

const {CrossNetworkAutomationServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new CrossNetworkAutomationServiceClient();

/**
 * Creates a Service Connection Token.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the Service Connection Token.
 * @param {string} serviceConnectionTokenId - The ID of the Service Connection Token to create.
 * @param {string} networkId - The ID of the VPC network to associate with the Service Connection Token.
 */
async function createServiceConnectionToken(projectId, locationId, serviceConnectionTokenId, networkId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const serviceConnectionToken = {
      network: `projects/${projectId}/global/networks/${networkId}`,
    };

    const request = {
      parent,
      serviceConnectionTokenId,
      serviceConnectionToken,
    };

    // Initiate the long-running operation to create the token
    const [operation] = await client.createServiceConnectionToken(request);
    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Created service connection token: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service connection token already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create service connection token: ${err.message}`);
    }
  }
}

module.exports = { createServiceConnectionToken };
// [END networkconnectivity_v1_crossnetworkautomationservice_serviceconnectiontoken_create]
