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

// [START tpu_v2alpha1_tpu_runtimeversions_list]
'use strict';

const {v2alpha1} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2alpha1.TpuClient();

/**
 * Lists available TPU runtime versions for a given location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or zone where TPU runtime versions are queried (for example, 'us-central1-a').
 */
async function listRuntimeVersions(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [runtimeVersions] = await client.listRuntimeVersions(request);
    for (const runtimeVersion of runtimeVersions) {
      console.log(`Runtime Version: ${runtimeVersion.version}`);
      console.log(`Resource Name: ${runtimeVersion.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`RPC failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {listRuntimeVersions};
// [END tpu_v2alpha1_tpu_runtimeversions_list]
