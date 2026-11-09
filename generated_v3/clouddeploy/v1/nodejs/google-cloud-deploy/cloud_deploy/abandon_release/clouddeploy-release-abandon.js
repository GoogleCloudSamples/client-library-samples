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

// [START clouddeploy_v1_clouddeploy_abandon_release]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the abandonRelease method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the delivery pipeline and release are located (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The caller-specified ID of the DeliveryPipeline containing the release.
 * @param {string} releaseId - The caller-specified ID of the Release to abandon.
 */
async function abandonRelease(projectId, locationId, deliveryPipelineId, releaseId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}/releases/${releaseId}`;

    const request = {
      name,
    };

    const [response] = await client.abandonRelease(request);
    console.log(`Abandoned release: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Release resource not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Release cannot be abandoned in its current state: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { abandonRelease };
// [END clouddeploy_v1_clouddeploy_abandon_release]
