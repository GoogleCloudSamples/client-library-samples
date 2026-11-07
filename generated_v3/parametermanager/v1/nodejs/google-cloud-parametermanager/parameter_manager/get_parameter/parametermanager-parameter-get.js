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

// [START parametermanager_v1_parametermanager_parameter_get]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

/**
 * Gets a parameter.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} parameterId - The parameter identifier (for example, 'example-parameter-id')
 */
async function getParameter(projectId, locationId, parameterId) {
  const clientOptions = {};
  if (locationId && locationId !== 'global') {
    clientOptions.apiEndpoint = `${locationId}-parametermanager.googleapis.com`;
  }
  const client = new ParameterManagerClient(clientOptions);

  try {
    const name = client.parameterPath(projectId, locationId, parameterId);
    const [parameter] = await client.getParameter({name});

    console.log(`Parameter name: ${parameter.name}`);
    console.log(`Format: ${parameter.format}`);
    return parameter;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parameter not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing parameter: ${err.message}`);
    } else {
      console.error(`API error retrieving parameter: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getParameter };
// [END parametermanager_v1_parametermanager_parameter_get]
