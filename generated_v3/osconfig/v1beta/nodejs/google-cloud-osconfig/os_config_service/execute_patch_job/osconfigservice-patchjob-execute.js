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

// [START osconfig_v1beta_osconfigservice_execute_patch_job]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Use the executePatchJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function executePatchJob(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const instanceFilter = {
      all: true,
    };

    const request = {
      parent,
      instanceFilter,
      description: 'OS patch job execution',
    };

    const [response] = await client.executePatchJob(request);

    console.log(`Patch job started: ${response.name}`);
    console.log(`Patch job state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API Error [${err.code}]: ${err.details || err.message}`);
    } else {
      console.error('Execution encountered an unexpected error:', err);
    }
  }
}

module.exports = { executePatchJob };
// [END osconfig_v1beta_osconfigservice_execute_patch_job]
