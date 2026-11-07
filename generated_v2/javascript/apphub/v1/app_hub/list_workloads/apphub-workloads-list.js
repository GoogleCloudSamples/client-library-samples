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

// [START apphub_v1_apphub_workloads_list]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Lists workloads in an App Hub application.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} applicationId - ID of the Application (for example, 'example-application-id')
 */
async function listWorkloads(projectId, locationId, applicationId) {
  try {
    const parent = client.applicationPath(projectId, locationId, applicationId);

    const request = {
      parent,
    };

    const [workloads] = await client.listWorkloads(request);

    if (workloads.length === 0) {
      console.log('No workloads found.');
    } else {
      for (const workload of workloads) {
        console.log(`Workload name: ${workload.name}`);
        console.log(`Display name: ${workload.displayName}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listWorkloads };
// [END apphub_v1_apphub_workloads_list]
