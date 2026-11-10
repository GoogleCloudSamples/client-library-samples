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

// [START parametermanager_v1_parametermanager_parameters_list]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Use the listParameters method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 */
async function listParameters(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [parameters] = await client.listParameters({
      parent,
    });

    for (const parameter of parameters) {
      console.log(`Parameter: ${parameter.name}`);
      console.log(`Format: ${parameter.format}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while listing parameters: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listParameters };
// [END parametermanager_v1_parametermanager_parameters_list]
