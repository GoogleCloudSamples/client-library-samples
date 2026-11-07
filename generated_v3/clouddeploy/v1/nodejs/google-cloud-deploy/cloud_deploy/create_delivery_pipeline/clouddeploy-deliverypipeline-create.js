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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Creates a DeliveryPipeline in Google Cloud Deploy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} deliveryPipelineId - ID of the DeliveryPipeline (for example, 'example-deliverypipeline-id')
 */
async function createDeliveryPipeline(projectId, deliveryPipelineId) {
  try {
    const locationName = 'us-central1';
    const parent = client.locationPath(projectId, locationName);
    const deliveryPipeline = {
      description: 'Standard delivery pipeline for staging and production deployments',
      serialPipeline: {
        stages: [
          {
            targetId: 'staging',
            profiles: []
          },
          {
            targetId: 'prod',
            profiles: []
          }
        ]
      }
    };

    const request = {
      parent,
      deliveryPipelineId,
      deliveryPipeline
    };

    const [operation] = await client.createDeliveryPipeline(request);
    const [response] = await operation.promise();

    console.log(`Created delivery pipeline: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Delivery pipeline ${deliveryPipelineId} already exists in ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating delivery pipeline ${deliveryPipelineId}.`);
    } else {
      console.error(`Error creating delivery pipeline: ${err.message}`);
    }
  }
}

module.exports = { createDeliveryPipeline };
// [END clouddeploy_v1_clouddeploy_deliverypipeline_create]
