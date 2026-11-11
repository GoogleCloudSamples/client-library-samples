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

// [START tpu_v2_tpu_runtimeversion_get]
'use strict';

const {v2} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2.TpuClient();

/**
 * Gets details of a Cloud TPU runtime version.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (zone or region) for the Cloud TPU, such as 'us-central1-a'.
 * @param {string} runtimeVersionId - The server-defined runtime version identifier (for example, 'tpu-vm-tf-2.14.0'), retrieved from ListRuntimeVersions.
 */
async function getRuntimeVersion(projectId, locationId, runtimeVersionId) {
  const name = `projects/${projectId}/locations/${locationId}/runtimeVersions/${runtimeVersionId}`;

  try {
    const [response] = await client.getRuntimeVersion({name});

    console.log(`Runtime Version Name: ${response.name}`);
    console.log(`Version: ${response.version}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Runtime version not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing runtime version: ${name}`);
    } else {
      console.error(`Failed to get runtime version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getRuntimeVersion};
// [END tpu_v2_tpu_runtimeversion_get]
