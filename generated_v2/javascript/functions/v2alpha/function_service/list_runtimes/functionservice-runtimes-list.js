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

// [START cloudfunctions_v2alpha_functionservice_runtimes_list]
'use strict';

const {FunctionServiceClient} = require('@google-cloud/functions').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new FunctionServiceClient();

/**
 * Lists all runtimes available for Cloud Functions in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listRuntimes(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [response] = await client.listRuntimes({parent});

    for (const runtime of response.runtimes || []) {
      console.log(`Runtime: ${runtime.name}`);
      console.log(`Stage: ${runtime.stage}`);
      console.log(`Environment: ${runtime.environment}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list runtimes: ${err.message}`);
    }
  }
}

module.exports = {listRuntimes};
// [END cloudfunctions_v2alpha_functionservice_runtimes_list]
