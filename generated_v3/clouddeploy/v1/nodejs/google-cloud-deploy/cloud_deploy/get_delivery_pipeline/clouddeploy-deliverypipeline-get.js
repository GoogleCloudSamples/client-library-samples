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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_get]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the getDeliveryPipeline method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the DeliveryPipeline is located (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The ID of the DeliveryPipeline to retrieve. Must match '[a-z]([a-z0-9-]{0,61}[a-z0-9])?'.
 */
async function getDeliveryPipeline(projectId, locationId, deliveryPipelineId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}`;

    const [deliveryPipeline] = await client.getDeliveryPipeline({name});

    console.log(`Retrieved delivery pipeline: ${deliveryPipeline.name}`);
    console.log(`Create time: ${deliveryPipeline.createTime?.seconds}`);
    return deliveryPipeline;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Delivery pipeline not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing delivery pipeline: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getDeliveryPipeline };
// [END clouddeploy_v1_clouddeploy_deliverypipeline_get]
