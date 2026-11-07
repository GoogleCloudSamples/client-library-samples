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

// [START networkmanagement_v1beta1_reachabilityservice_connectivitytests_list]
'use strict';

const {ReachabilityServiceClient} = require('@google-cloud/network-management');
const {status} = require('@grpc/grpc-js');

const client = new ReachabilityServiceClient();

/**
 * Lists connectivity tests in the specified project.
 *
 * @param {string} [projectId] - The Google Cloud project ID (for example, 'example-project-id').
 */
async function listConnectivityTests(projectId) {
  try {
    let resolvedProjectId = projectId;
    if (typeof projectId === 'object' && projectId !== null) {
      resolvedProjectId = projectId.projectId || projectId.project_id;
    }
    if (!resolvedProjectId) {
      resolvedProjectId =
        process.env.GOOGLE_CLOUD_PROJECT ||
        process.env.PROJECT_ID ||
        process.env.GCLOUD_PROJECT ||
        (await client.getProjectId());
    }

    const parent = `projects/${resolvedProjectId}/locations/global`;
    const request = {
      parent,
    };

    const [tests] = await client.listConnectivityTests(request);
    console.log(`Retrieved ${tests.length} connectivity tests.`);
    for (const test of tests) {
      console.log(`Test name: ${test.name}`);
      console.log(`Protocol: ${test.protocol}`);
    }
    return tests;
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listConnectivityTests };
// [END networkmanagement_v1beta1_reachabilityservice_connectivitytests_list]
