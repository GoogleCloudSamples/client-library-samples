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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]
'use strict';

const {AutoscalingPolicyServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dataproc autoscaling policy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location or region where the autoscaling policy is defined (for example, 'us-central1').
 * @param {string} autoscalingPolicyId - The identifier of the autoscaling policy (for example, 'example-autoscaling-policy').
 */
async function getAutoscalingPolicy(projectId, locationId, autoscalingPolicyId) {
  const endpoint =
    locationId === 'global'
      ? 'dataproc.googleapis.com'
      : `${locationId}-dataproc.googleapis.com`;
  const client = new AutoscalingPolicyServiceClient({apiEndpoint: endpoint});

  try {
    const name = `projects/${projectId}/locations/${locationId}/autoscalingPolicies/${autoscalingPolicyId}`;

    const request = {
      name,
    };

    const [policy] = await client.getAutoscalingPolicy(request);
    console.log(`Retrieved autoscaling policy: ${policy.name}`);
    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Autoscaling policy not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing autoscaling policy: ${err.message}`);
    } else {
      console.error(`API error occurred while retrieving policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getAutoscalingPolicy };
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]
