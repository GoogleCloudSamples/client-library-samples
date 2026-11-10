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

// [START parametermanager_v1_parametermanager_parameter_update]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Updates a parameter in Google Cloud Parameter Manager.
 */
async function updateParameter() {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parameterId = 'example-parameter-id';

    const parameter = {
      name: `projects/${projectId}/locations/${location}/parameters/${parameterId}`,
      labels: {
        environment: 'staging',
      },
    };

    const request = {
      parameter,
      updateMask: {
        paths: ['labels'],
      },
    };

    const [response] = await client.updateParameter(request);
    console.log(`Updated parameter: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parameter not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid parameter argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update parameter: ${err.message}`);
    }
  }
}

module.exports = { updateParameter };
// [END parametermanager_v1_parametermanager_parameter_update]
