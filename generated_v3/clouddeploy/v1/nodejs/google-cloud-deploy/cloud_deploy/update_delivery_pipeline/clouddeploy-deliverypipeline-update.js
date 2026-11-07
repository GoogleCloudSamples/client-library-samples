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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_update]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the updateDeliveryPipeline method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The ID of the existing DeliveryPipeline to update. Format must match '[a-z]([a-z0-9-]{0,61}[a-z0-9])?'.
 */
async function updateDeliveryPipeline(projectId, locationId, deliveryPipelineId) {
  try {
    const deliveryPipeline = {
      name: `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}`,
      description: 'Updated delivery pipeline description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      deliveryPipeline,
      updateMask,
    };

    // UpdateDeliveryPipeline returns a long-running operation
    const [operation] = await client.updateDeliveryPipeline(request);
    const [response] = await operation.promise();

    console.log(`Updated delivery pipeline: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Delivery pipeline not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateDeliveryPipeline };
// [END clouddeploy_v1_clouddeploy_deliverypipeline_update]
