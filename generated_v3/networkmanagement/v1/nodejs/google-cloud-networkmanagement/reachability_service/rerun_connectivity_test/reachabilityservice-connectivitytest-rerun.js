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

// [START networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

/**
 * Reruns an existing connectivity test.
 *
 * @param {string} project_id - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} test_id - ID of the Test (for example, 'example-test-id')
 */
async function rerunConnectivityTest(project_id, test_id) {
  const client = new ReachabilityServiceClient();

  if (typeof project_id === 'object' && project_id !== null) {
    test_id = project_id.test_id || project_id.testId;
    project_id = project_id.project_id || project_id.projectId;
  }
  const resolvedProjectId = project_id || process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID;
  const resolvedTestId = test_id || process.env.TEST_ID;

  try {
    const name = `projects/${resolvedProjectId}/locations/global/connectivityTests/${resolvedTestId}`;
    const request = {
      name,
    };

    const [operation] = await client.rerunConnectivityTest(request);
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
    } else {
      console.error(`Error rerunning connectivity test: ${err.message}`);
    }
  }
}

module.exports = { rerunConnectivityTest };
// [END networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
