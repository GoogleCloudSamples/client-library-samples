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

// [START parametermanager_v1_parametermanager_parameter_create]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

/**
 * Creates a parameter in Parameter Manager.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId The Google Cloud location (for example, 'us-central1').
 * @param {string} parameterId The parameter identifier (for example, 'example-parameter-id').
 */
async function createParameter(projectId, locationId, parameterId) {
  try {
    const clientOptions = {};
    if (locationId && locationId !== 'global') {
      clientOptions.apiEndpoint = `${locationId}-parametermanager.googleapis.com`;
    }
    const client = new ParameterManagerClient(clientOptions);

    const parent = client.locationPath(projectId, locationId);
    const parameter = {
      format: 'UNFORMATTED',
      labels: {
        environment: 'example-environment',
      },
    };

    const request = {
      parent,
      parameterId,
      parameter,
    };

    const [response] = await client.createParameter(request);
    console.log(`Created parameter: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Parameter already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create parameter: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {createParameter};
// [END parametermanager_v1_parametermanager_parameter_create]
