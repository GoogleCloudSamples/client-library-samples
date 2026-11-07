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

// [START clouddeploy_v1_clouddeploy_rollout_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Creates a rollout for a release in Cloud Deploy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} rolloutId - The caller-specified ID to assign to the new Rollout (for example, 'rollout-001'). Must match [a-z]([a-z0-9-]{0,61}[a-z0-9])?.
 * @param {string} releaseId - The ID of the Release to roll out (for example, 'release-001'). Must match [a-z]([a-z0-9-]{0,61}[a-z0-9])?.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The ID of the DeliveryPipeline (for example, 'example-pipeline'). Must match [a-z]([a-z0-9-]{0,61}[a-z0-9])?.
 */
async function createRollout(projectId, rolloutId, releaseId, locationId, deliveryPipelineId) {
  try {
    const parent = client.releasePath(
      projectId,
      locationId,
      deliveryPipelineId,
      releaseId
    );

    const rollout = {
      targetId: 'prod',
      description: 'Production rollout',
    };

    const [operation] = await client.createRollout({
      parent,
      rolloutId,
      rollout,
    });

    const [response] = await operation.promise();
    console.log(`Created rollout: ${response.name}`);
    console.log(`Rollout state: ${response.state}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Rollout already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createRollout };
// [END clouddeploy_v1_clouddeploy_rollout_create]
