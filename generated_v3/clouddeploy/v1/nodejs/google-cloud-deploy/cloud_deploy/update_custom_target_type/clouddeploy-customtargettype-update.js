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

// [START clouddeploy_v1_clouddeploy_customtargettype_update]
'use strict';

const {CloudDeployClient} = require('@google-cloud/deploy');
const {status} = require('@grpc/grpc-js');

const client = new CloudDeployClient();

/**
 * Updates an existing custom target type.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region ID (for example, 'us-central1').
 * @param {string} customTargetTypeId - The ID of the custom target type to update.
 */
async function updateCustomTargetType(projectId, locationId, customTargetTypeId) {
  try {
    const customTargetType = {
      name: `projects/${projectId}/locations/${locationId}/customTargetTypes/${customTargetTypeId}`,
      description: 'Updated custom target type description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateCustomTargetType({
      customTargetType,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Custom target type updated: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Custom target type not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateCustomTargetType };
// [END clouddeploy_v1_clouddeploy_customtargettype_update]
