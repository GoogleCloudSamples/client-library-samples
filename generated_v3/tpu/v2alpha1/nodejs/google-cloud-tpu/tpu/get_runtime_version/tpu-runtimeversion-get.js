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

// [START tpu_v2alpha1_tpu_runtimeversion_get]
'use strict';

const {v2alpha1} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new v2alpha1.TpuClient();

/**
 * Retrieves details of a specific Cloud TPU runtime version.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or zone).
 * @param {string} runtimeVersionId - The ID of the Cloud TPU runtime version.
 */
async function getRuntimeVersion(projectId, locationId, runtimeVersionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/runtimeVersions/${runtimeVersionId}`;
    const request = {
      name,
    };

    const [runtimeVersion] = await client.getRuntimeVersion(request);

    console.log(`Runtime Version Name: ${runtimeVersion.name}`);
    console.log(`Version: ${runtimeVersion.version}`);

    return runtimeVersion;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Runtime version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing runtime version: ${err.message}`);
    } else if (err.code) {
      console.error(`API error retrieving runtime version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRuntimeVersion };
// [END tpu_v2alpha1_tpu_runtimeversion_get]
