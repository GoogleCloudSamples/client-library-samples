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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
'use strict';

const {AutoscalingPolicyServiceClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes an autoscaling policy in Google Cloud Dataproc.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region where the autoscaling policy resides (for example, 'us-central1').
 * @param {string} autoscalingPolicyId - The ID of the autoscaling policy to delete.
 */
async function deleteAutoscalingPolicy(projectId, locationId, autoscalingPolicyId) {
  try {
    const client = new AutoscalingPolicyServiceClient({
      apiEndpoint: locationId === 'global' ? 'dataproc.googleapis.com' : `${locationId}-dataproc.googleapis.com`,
    });

    const name = `projects/${projectId}/locations/${locationId}/autoscalingPolicies/${autoscalingPolicyId}`;

    const request = {
      name,
    };

    await client.deleteAutoscalingPolicy(request);
    console.log(`Deleted autoscaling policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Autoscaling policy not found: ${autoscalingPolicyId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Autoscaling policy is currently in use and cannot be deleted: ${autoscalingPolicyId}`);
    } else {
      console.error(`Failed to delete autoscaling policy: ${err.message}`);
    }
  }
}

module.exports = { deleteAutoscalingPolicy };
// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
