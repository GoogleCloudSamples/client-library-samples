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

// [START tpu_v1_tpu_acceleratortypes_list]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Lists the Cloud TPU accelerator types available in a specified project and location.
 */
async function listAcceleratorTypes() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-b';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    // Obtain matching accelerator types from the service
    const [acceleratorTypes] = await client.listAcceleratorTypes(request);

    for (const acceleratorType of acceleratorTypes) {
      console.log(`Accelerator Type: ${acceleratorType.name}`);
      console.log(`Type: ${acceleratorType.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified location or project not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Insufficient permissions to list accelerator types:', err.message);
    } else {
      console.error('Request failed:', err.message);
    }
  }
}

module.exports = { listAcceleratorTypes };
// [END tpu_v1_tpu_acceleratortypes_list]
