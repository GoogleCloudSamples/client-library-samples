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

// [START clouddeploy_v1_clouddeploy_automation_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the createAutomation method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} automationId - Caller-chosen ID of the Automation to create (for example, 'promote-to-prod').
 * @param {string} deliveryPipelineId - The ID of the parent DeliveryPipeline (for example, 'my-delivery-pipeline').
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 */
async function createAutomation(projectId, automationId, deliveryPipelineId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}`;

    const targetAttribute = {
      id: '*',
    };

    const promoteReleaseRule = {
      id: 'promote-release',
      destinationTargetId: '@next',
    };

    const automationRule = {
      promoteReleaseRule,
    };

    const automation = {
      serviceAccount: `example-service-account@${projectId}.iam.gserviceaccount.com`,
      selector: {
        targets: [targetAttribute],
      },
      rules: [automationRule],
    };

    const request = {
      parent,
      automationId,
      automation,
    };

    // CreateAutomation returns a long-running operation
    const [operation] = await client.createAutomation(request);
    const [response] = await operation.promise();

    console.log(`Created automation: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Automation ${automationId} already exists in ${deliveryPipelineId}.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Delivery pipeline ${deliveryPipelineId} not found in ${locationId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing ${parent}.`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAutomation };
// [END clouddeploy_v1_clouddeploy_automation_create]
