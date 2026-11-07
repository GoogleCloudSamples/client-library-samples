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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_delete]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new ReachabilityServiceClient();

/**
 * Use the deleteConnectivityTest method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} testId - ID of the Test (for example, 'example-test-id')
 */
async function deleteConnectivityTest(projectId, testId) {
  try {
    // Construct the resource name for the connectivity test
    const name = client.connectivityTestPath(projectId, testId);

    // Initiate the long-running delete operation
    const [operation] = await client.deleteConnectivityTest({name});
    await operation.promise();

    console.log(`Successfully deleted connectivity test: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connectivity test not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting connectivity test: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { deleteConnectivityTest };
// [END networkmanagement_v1_reachabilityservice_connectivitytest_delete]
