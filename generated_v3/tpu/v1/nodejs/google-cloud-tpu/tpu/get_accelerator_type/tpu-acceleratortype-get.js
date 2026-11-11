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

// [START tpu_v1_tpu_acceleratortype_get]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Retrieves details of a specific Cloud TPU accelerator type.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location or zone for the TPU accelerator type (for example, 'us-central1-b').
 * @param {string} acceleratorTypeId - The server-defined accelerator type identifier (for example, 'v2-8').
 */
async function getAcceleratorType(projectId, locationId, acceleratorTypeId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/acceleratorTypes/${acceleratorTypeId}`;

    const [acceleratorType] = await client.getAcceleratorType({name});

    console.log(`Accelerator Type: ${acceleratorType.name}`);
    console.log(`Type: ${acceleratorType.type}`);
    return acceleratorType;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Accelerator type not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing accelerator type: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAcceleratorType };
// [END tpu_v1_tpu_acceleratortype_get]
