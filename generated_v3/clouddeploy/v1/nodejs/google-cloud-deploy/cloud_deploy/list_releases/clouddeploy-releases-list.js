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

// [START clouddeploy_v1_clouddeploy_releases_list]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Lists releases for a delivery pipeline.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the delivery pipeline resides (for example, 'us-central1').
 * @param {string} deliveryPipelineId - The ID of the Cloud Deploy delivery pipeline. Must match regex '[a-z]([a-z0-9-]{0,61}[a-z0-9])?'.
 */
async function listReleases(projectId, locationId, deliveryPipelineId) {
  try {
    const parent = client.deliveryPipelinePath(
      projectId,
      locationId,
      deliveryPipelineId
    );

    const request = {
      parent,
    };

    const [releases] = await client.listReleases(request);

    if (releases.length === 0) {
      console.log(`No releases found in ${deliveryPipelineId}.`);
      return;
    }

    for (const release of releases) {
      console.log(`Release Name: ${release.name}`);
      console.log(`Render State: ${release.renderState}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Delivery pipeline not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing resources: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list releases: ${err.message}`);
    }
  }
}

module.exports = { listReleases };
// [END clouddeploy_v1_clouddeploy_releases_list]
