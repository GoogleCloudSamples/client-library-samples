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

// [START parametermanager_v1_parametermanager_parameterversion_update]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Updates a ParameterVersion to toggle its disabled state.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the Parameter (for example, 'global').
 * @param {string} parameterId - The ID of the parent Parameter resource.
 * @param {string} parameterVersionId - The ID of the ParameterVersion to update.
 */
async function updateParameterVersion(projectId, locationId, parameterId, parameterVersionId) {
  try {
    const parameterVersion = {
      name: `projects/${projectId}/locations/${locationId}/parameters/${parameterId}/versions/${parameterVersionId}`,
      disabled: true,
    };
    const updateMask = {
      paths: ['disabled'],
    };

    const [response] = await client.updateParameterVersion({
      parameterVersion,
      updateMask,
    });

    console.log(`Updated parameter version: ${response.name}`);
    console.log(`Disabled status: ${response.disabled}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Error updating parameter version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateParameterVersion };
// [END parametermanager_v1_parametermanager_parameterversion_update]
