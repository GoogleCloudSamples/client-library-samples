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

// [START dataform_v1beta1_dataform_releaseconfig_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the getReleaseConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region of the Dataform repository (e.g., us-central1).
 * @param {string} repositoryId - The caller-assigned ID of the Dataform repository.
 * @param {string} releaseConfigId - The caller-assigned ID of the release configuration.
 */
async function getReleaseConfig(projectId, locationId, repositoryId, releaseConfigId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/releaseConfigs/${releaseConfigId}`;

    const request = {
      name,
    };

    const [releaseConfig] = await client.getReleaseConfig(request);

    console.log(`Retrieved release configuration: ${releaseConfig.name}`);
    console.log(`Git commitish: ${releaseConfig.gitCommitish}`);

    return releaseConfig;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Release configuration not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing release configuration: ${err.message}`);
    } else {
      console.error(`Error retrieving release configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getReleaseConfig };
// [END dataform_v1beta1_dataform_releaseconfig_get]
