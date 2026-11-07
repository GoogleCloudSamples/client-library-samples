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

// [START clouddeploy_v1_clouddeploy_automationruns_list]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Lists AutomationRuns in a given delivery pipeline.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} deliveryPipelineId - ID of the DeliveryPipeline (for example, 'example-deliverypipeline-id')
 */
async function listAutomationRuns(projectId, locationId, deliveryPipelineId) {
  try {
    // Construct the resource name for the parent delivery pipeline
    const parent = client.deliveryPipelinePath(
      projectId,
      locationId,
      deliveryPipelineId
    );

    const request = {
      parent,
    };

    const [automationRuns] = await client.listAutomationRuns(request);

    if (automationRuns.length === 0) {
      console.log(`No automation runs found for delivery pipeline: ${deliveryPipelineId}`);
      return;
    }

    for (const run of automationRuns) {
      console.log(`Automation Run: ${run.name}`);
      console.log(`  State: ${run.state}`);
      console.log(`  Automation ID: ${run.automationId}`);
      console.log(`  Rule ID: ${run.ruleId}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list automation runs: ${err.message}`);
    }
  }
}

module.exports = { listAutomationRuns };
// [END clouddeploy_v1_clouddeploy_automationruns_list]
