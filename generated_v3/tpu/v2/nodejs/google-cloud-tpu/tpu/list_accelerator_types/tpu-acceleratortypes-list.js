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

// [START tpu_v2_tpu_acceleratortypes_list]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Use the listAcceleratorTypes method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region or zone) to query, such as us-central1-a.
 */
async function listAcceleratorTypes(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    const request = {
      parent,
    };

    const [acceleratorTypes] = await client.listAcceleratorTypes(request);

    for (const acceleratorType of acceleratorTypes) {
      console.log(`Accelerator type: ${acceleratorType.name}`);
      console.log(`  Type: ${acceleratorType.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`The specified location was not found: ${parent}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing Cloud TPU resources for: ${parent}`);
    } else if (err.code !== undefined) {
      console.error(`Cloud TPU API error [gRPC code ${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listAcceleratorTypes };
// [END tpu_v2_tpu_acceleratortypes_list]
