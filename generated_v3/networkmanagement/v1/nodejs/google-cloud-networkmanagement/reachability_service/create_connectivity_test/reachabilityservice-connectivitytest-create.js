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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_create]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new ReachabilityServiceClient();

/**
 * Use the createConnectivityTest method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} testId - ID of the Test (for example, 'example-test-id')
 */
async function createConnectivityTest(projectId, testId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const resource = {
      name: `${parent}/connectivityTests/${testId}`,
      description: 'Reachability test between two IP addresses',
      source: {
        ipAddress: '10.0.0.1',
        network: `projects/${projectId}/global/networks/default`,
        networkType: 'GCP_NETWORK',
      },
      destination: {
        ipAddress: '10.0.0.2',
        network: `projects/${projectId}/global/networks/default`,
        networkType: 'GCP_NETWORK',
      },
      protocol: 'TCP',
    };

    const request = {
      parent,
      testId,
      resource,
    };

    const [operation] = await client.createConnectivityTest(request);
    const [response] = await operation.promise();

    console.log(`Connectivity test created: ${response.name}`);
    console.log(`Verification result: ${response.reachabilityDetails?.result ?? 'PENDING'}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Connectivity test ${testId} already exists:`, err.message);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid arguments provided for connectivity test:', err.message);
    } else {
      console.error('Failed to create connectivity test:', err.message);
    }
  }
}

module.exports = { createConnectivityTest };
// [END networkmanagement_v1_reachabilityservice_connectivitytest_create]
