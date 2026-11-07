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

// [START clouddeploy_v1_clouddeploy_customtargettype_create]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Creates a custom target type in Google Cloud Deploy.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} customTargetTypeId - The ID to assign to the CustomTargetType (for example, 'example-custom-target-type'). Must match regex `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function createCustomTargetType(projectId, customTargetTypeId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const customTargetType = {
      description: 'Custom target type for automated deployments',
      customActions: {
        deployAction: 'custom-deploy',
      },
    };

    const request = {
      parent,
      customTargetTypeId,
      customTargetType,
    };

    // Initiates the long-running operation to create the custom target type
    const [operation] = await client.createCustomTargetType(request);
    const [response] = await operation.promise();

    console.log(`Created custom target type: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Custom target type already exists: ${customTargetTypeId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating custom target type: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create custom target type: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createCustomTargetType };
// [END clouddeploy_v1_clouddeploy_customtargettype_create]
