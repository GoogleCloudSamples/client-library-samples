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

// [START tpu_v2alpha1_tpu_acceleratortype_get]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Retrieves details of a specific Cloud TPU accelerator type.
 */
async function getAcceleratorType() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-f';
    const acceleratorTypeId = 'v2-8';
    const name = client.acceleratorTypePath(
      projectId,
      location,
      acceleratorTypeId
    );

    const [response] = await client.getAcceleratorType({name});

    console.log(`Accelerator type name: ${response.name}`);
    console.log(`Accelerator type: ${response.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Accelerator type not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve accelerator type: ${err.message}`);
    }
  }
}

module.exports = {getAcceleratorType};
// [END tpu_v2alpha1_tpu_acceleratortype_get]
