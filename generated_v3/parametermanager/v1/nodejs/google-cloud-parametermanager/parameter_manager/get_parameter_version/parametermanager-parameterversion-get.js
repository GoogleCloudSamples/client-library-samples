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

// [START parametermanager_v1_parametermanager_parameterversion_get]
'use strict';

const {ParameterManagerClient} = require('@google-cloud/parametermanager');
const {status} = require('@grpc/grpc-js');

const client = new ParameterManagerClient();

/**
 * Use the getParameterVersion method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} parameterId - ID of the Parameter (for example, 'example-parameter-id')
 * @param {string} versionId - ID of the Version (for example, 'example-version-id')
 */
async function getParameterVersion(projectId, locationId, parameterId, versionId) {
  try {
    // Construct the resource name for the parameter version
    const name = client.parameterVersionPath(
      projectId,
      locationId,
      parameterId,
      versionId
    );

    const [response] = await client.getParameterVersion({name});

    console.log(`Parameter version name: ${response.name}`);
    console.log(`Disabled: ${response.disabled}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parameter version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getParameterVersion };
// [END parametermanager_v1_parametermanager_parameterversion_get]
