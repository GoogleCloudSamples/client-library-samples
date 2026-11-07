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

// [START datafusion_v1beta1_datafusion_instance_get]
'use strict';

const {DataFusionClient} = require('@google-cloud/data-fusion');
const {status} = require('@grpc/grpc-js');

const client = new DataFusionClient();

/**
 * Retrieves details of a Cloud Data Fusion instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} instanceId - The caller-specified identifier of the Data Fusion instance (for example, 'example-instance-id').
 */
async function getInstance(projectId, locationId, instanceId) {
  const name = `projects/${projectId}/locations/${locationId}/instances/${instanceId}`;

  try {
    const [instance] = await client.getInstance({name});

    console.log(`Instance: ${instance.name}`);
    console.log(`State: ${instance.state}`);
    console.log(`Type: ${instance.type}`);
    console.log(`Version: ${instance.version}`);

    return instance;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing instance: ${name}`);
    } else {
      console.error(`RPC failed with error code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstance };
// [END datafusion_v1beta1_datafusion_instance_get]
