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

// [START dataform_v1_dataform_config_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Retrieves the Dataform configuration for a project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, us-central1).
 */
async function getConfig(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/config`;

    const request = {
      name,
    };

    const [response] = await client.getConfig(request);

    console.log(`Configuration name: ${response.name}`);
    console.log(
      `Default execution service account: ${response.defaultExecutionServiceAccount}`
    );

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getConfig };
// [END dataform_v1_dataform_config_get]
