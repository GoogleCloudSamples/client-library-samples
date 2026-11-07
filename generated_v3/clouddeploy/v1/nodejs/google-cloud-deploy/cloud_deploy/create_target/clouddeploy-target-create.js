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

// [START clouddeploy_v1_clouddeploy_target_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Use the createTarget method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} targetId - Caller-chosen ID of the Target. Must match regex '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$' (for example, 'sample-target').
 * @param {string} locationId - The Google Cloud region for the Cloud Deploy target (for example, 'us-central1').
 */
async function createTarget(projectId, targetId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const target = {
      description: 'Cloud Run target',
      run: {
        location: `projects/${projectId}/locations/${locationId}`,
      },
    };

    const request = {
      parent,
      targetId,
      target,
    };

    const [operation] = await client.createTarget(request);
    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log(`Target created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Target ${targetId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating target ${targetId}.`);
    } else {
      console.error(`Failed to create target: ${err.message}`);
    }
  }
}

module.exports = { createTarget };
// [END clouddeploy_v1_clouddeploy_target_create]
