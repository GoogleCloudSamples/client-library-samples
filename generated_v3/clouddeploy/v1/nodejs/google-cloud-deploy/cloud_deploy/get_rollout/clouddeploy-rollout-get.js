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

// [START clouddeploy_v1_clouddeploy_rollout_get]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the getRollout method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} releaseId - The ID of the existing Cloud Deploy release.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The ID of the existing Cloud Deploy delivery pipeline.
 * @param {string} rolloutId - The ID of the Cloud Deploy rollout to retrieve.
 */
async function getRollout(projectId, releaseId, locationId, deliveryPipelineId, rolloutId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}/releases/${releaseId}/rollouts/${rolloutId}`;
    const request = {
      name,
    };

    const [response] = await client.getRollout(request);
    console.log(`Rollout name: ${response.name}`);
    console.log(`Rollout state: ${response.state}`);
    console.log(`Rollout target ID: ${response.targetId}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Rollout resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing rollout: ${err.message}`);
    } else if (err.code) {
      console.error(`API error retrieving rollout: ${err.message}`);
    } else {
      console.error(`Error retrieving rollout: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRollout };
// [END clouddeploy_v1_clouddeploy_rollout_get]
