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

// [START clouddeploy_v1_clouddeploy_target_update]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Updates an existing Cloud Deploy target.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} targetId - The ID of the Target to update.
 */
async function updateTarget(projectId, locationId, targetId) {
  try {
    const updateMask = {
      paths: ['description'],
    };

    const target = {
      name: client.targetPath(projectId, locationId, targetId),
      description: 'Updated target description',
    };

    const request = {
      target,
      updateMask,
    };

    // UpdateTarget returns a long-running operation
    const [operation] = await client.updateTarget(request);
    const [response] = await operation.promise();

    console.log(`Target updated successfully: ${response.name}`);
    console.log(`Target description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Target not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateTarget };
// [END clouddeploy_v1_clouddeploy_target_update]
