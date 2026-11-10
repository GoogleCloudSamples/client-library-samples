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

// [START parametermanager_v1_parametermanager_parameter_delete]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Use the deleteParameter method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} parameterId - The caller-chosen ID of the Parameter to delete (for example, 'example-parameter-id')
 */
async function deleteParameter(projectId, locationId, parameterId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/parameters/${parameterId}`;
    await client.deleteParameter({name});
    console.log(`Deleted parameter: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parameter not found: ${err.message}`);
    } else {
      console.error(`Failed to delete parameter: ${err.message}`);
    }
  }
}

module.exports = { deleteParameter };
// [END parametermanager_v1_parametermanager_parameter_delete]
