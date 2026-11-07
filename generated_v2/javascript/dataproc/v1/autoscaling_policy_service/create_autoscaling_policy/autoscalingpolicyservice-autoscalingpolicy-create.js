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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
'use strict';

const {AutoscalingPolicyServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Creates an autoscaling policy in Google Cloud Dataproc.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function createAutoscalingPolicy(projectId, locationId) {
  // Dataproc regional resources require setting the regional API endpoint.
  const endpoint =
    locationId === 'global'
      ? 'dataproc.googleapis.com'
      : `${locationId}-dataproc.googleapis.com`;
  const client = new AutoscalingPolicyServiceClient({apiEndpoint: endpoint});

  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const yarnConfig = {
      gracefulDecommissionTimeout: {seconds: 3600},
      scaleUpFactor: 1.0,
      scaleDownFactor: 1.0,
    };

    const policy = {
      id: 'example-autoscaling-policy',
      workerConfig: {
        minInstances: 2,
        maxInstances: 10,
      },
      basicAlgorithm: {
        yarnConfig,
      },
    };

    const request = {
      parent,
      policy,
    };

    const [createdPolicy] = await client.createAutoscalingPolicy(request);
    console.log(`Created autoscaling policy: ${createdPolicy.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Autoscaling policy already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { createAutoscalingPolicy };
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
