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

// [START storage_v2_storagecontrol_projectintelligenceconfig_update]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Use the updateProjectIntelligenceConfig method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the intelligence config, typically 'global'.
 */
async function updateProjectIntelligenceConfig(projectId, locationId) {
  try {
    const updateMask = {
      paths: ['edition_config'],
    };
    const intelligenceConfig = {
      name: `projects/${projectId}/locations/${locationId}/intelligenceConfig`,
      editionConfig: 'STANDARD',
    };

    const [response] = await client.updateProjectIntelligenceConfig({
      intelligenceConfig,
      updateMask,
    });

    console.log(`Updated project intelligence configuration: ${response.name}`);
    console.log(`Edition: ${response.editionConfig}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project intelligence configuration not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateProjectIntelligenceConfig };
// [END storage_v2_storagecontrol_projectintelligenceconfig_update]
