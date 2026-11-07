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

// [START networkmanagement_v1beta1_reachabilityservice_rerun_connectivity_test]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new ReachabilityServiceClient();

/**
 * Use the rerunConnectivityTest method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} testId - The user-specified identifier of the existing Connectivity Test to rerun (for example, 'example-test-id').
 */
async function rerunConnectivityTest(projectId, testId) {
  try {
    const name = `projects/${projectId}/locations/global/connectivityTests/${testId}`;

    const [operation] = await client.rerunConnectivityTest({name});
    const [response] = await operation.promise();

    console.log(`Connectivity test rerun completed: ${response.name}`);
    if (response.reachabilityDetails) {
      console.log(`Reachability result: ${response.reachabilityDetails.result}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connectivity test not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.DEADLINE_EXCEEDED) {
      console.error(`Operation timed out: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { rerunConnectivityTest };
// [END networkmanagement_v1beta1_reachabilityservice_rerun_connectivity_test]
