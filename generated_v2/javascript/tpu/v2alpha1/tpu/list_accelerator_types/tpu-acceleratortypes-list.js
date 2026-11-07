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

// [START tpu_v2alpha1_tpu_acceleratortypes_list]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Lists accelerator types available for Cloud TPU in a specified project and location.
 */
async function listAcceleratorTypes() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-a';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [acceleratorTypes] = await client.listAcceleratorTypes(request);

    for (const acceleratorType of acceleratorTypes) {
      console.log(`Accelerator type: ${acceleratorType.name}`);
      console.log(`Type: ${acceleratorType.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Request failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listAcceleratorTypes };
// [END tpu_v2alpha1_tpu_acceleratortypes_list]
