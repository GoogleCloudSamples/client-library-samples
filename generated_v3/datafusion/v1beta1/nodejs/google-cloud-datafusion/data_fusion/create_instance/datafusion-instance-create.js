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

// [START datafusion_v1beta1_datafusion_instance_create]
'use strict';

const {DataFusionClient} = require('@google-cloud/data-fusion');
const {status} = require('@grpc/grpc-js');

const client = new DataFusionClient();

/**
 * Creates a Cloud Data Fusion instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} instanceId - Caller-chosen identifier of the instance to create (for example, 'example-instance-id').
 */
async function createInstance(projectId, locationId, instanceId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const instance = {
      type: 'BASIC',
    };

    const request = {
      parent,
      instanceId,
      instance,
    };

    // Cloud Data Fusion instance provisioning takes approximately 30 minutes.
    // Initiating the operation without blocking on operation completion prevents runner timeout.
    const [operation] = await client.createInstance(request);

    console.log(`Initiated instance creation operation: ${operation.name}`);
    return operation;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Instance ${instanceId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to create Data Fusion instance.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create instance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createInstance };
// [END datafusion_v1beta1_datafusion_instance_create]
