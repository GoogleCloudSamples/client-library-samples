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

// [START clouddeploy_v1_clouddeploy_deploypolicy_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Creates a DeployPolicy in Google Cloud Deploy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} deployPolicyId - ID of the DeployPolicy (for example, 'example-deploypolicy-id')
 */
async function createDeployPolicy(projectId, deployPolicyId) {
  try {
    const locationName = 'us-central1';
    const parent = `projects/${projectId}/locations/${locationName}`;

    const pipelineSelector = {
      deliveryPipeline: {
        id: 'example-pipeline-id',
      },
    };

    const weeklyWindow = {
      daysOfWeek: ['SATURDAY', 'SUNDAY'],
      startTime: {
        hours: 0,
        minutes: 0,
      },
      endTime: {
        hours: 23,
        minutes: 59,
      },
    };

    const timeWindows = {
      timeZone: 'UTC',
      weeklyWindows: [weeklyWindow],
    };

    const rolloutRestriction = {
      id: 'example-restriction-id',
      actions: ['ROLLOUT_RESTRICTION_ACTION_ALL'],
      timeWindows,
    };

    const deployPolicy = {
      description: 'Example deploy policy',
      suspended: false,
      selectors: [pipelineSelector],
      rules: [
        {
          rolloutRestriction,
        },
      ],
    };

    const request = {
      parent,
      deployPolicyId,
      deployPolicy,
    };

    const [operation] = await client.createDeployPolicy(request);
    const [response] = await operation.promise();

    console.log(`Created deploy policy: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Deploy policy already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Cloud Deploy API error (code: ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createDeployPolicy };
// [END clouddeploy_v1_clouddeploy_deploypolicy_create]
