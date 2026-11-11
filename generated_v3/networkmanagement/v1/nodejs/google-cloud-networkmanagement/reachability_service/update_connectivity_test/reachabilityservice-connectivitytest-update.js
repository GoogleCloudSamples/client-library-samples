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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_update]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new ReachabilityServiceClient();

/**
 * Use the updateConnectivityTest method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} connectivityTestId - The user-defined identifier of the existing Connectivity Test to update.
 */
async function updateConnectivityTest(projectId, connectivityTestId) {
  try {
    const resource = {
      name: `projects/${projectId}/locations/global/connectivityTests/${connectivityTestId}`,
      description: 'Updated connectivity test description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // UpdateConnectivityTest initiates a long-running operation
    const [operation] = await client.updateConnectivityTest({
      updateMask,
      resource,
    });
    const [response] = await operation.promise();

    console.log(`Updated connectivity test: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connectivity test not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update connectivity test: ${err.message}`);
    }
  }
}

module.exports = { updateConnectivityTest };
// [END networkmanagement_v1_reachabilityservice_connectivitytest_update]
