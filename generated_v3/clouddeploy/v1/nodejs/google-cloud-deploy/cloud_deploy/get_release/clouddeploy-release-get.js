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

// [START clouddeploy_v1_clouddeploy_release_get]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Retrieves a Cloud Deploy release.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} releaseId - The ID of the Release (for example, 'example-release-001').
 * @param {string} deliveryPipelineId - The ID of the Delivery Pipeline (for example, 'example-pipeline').
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 */
async function getRelease(projectId, releaseId, deliveryPipelineId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/deliveryPipelines/${deliveryPipelineId}/releases/${releaseId}`;

    const [release] = await client.getRelease({name});

    console.log(`Release name: ${release.name}`);
    console.log(`Render state: ${release.renderState}`);
    return release;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Release not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve release: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getRelease };
// [END clouddeploy_v1_clouddeploy_release_get]
