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

// [START storage_v2_storagecontrol_projectintelligenceconfig_get]
'use strict';

const {StorageControlClient} = require('@google-cloud/storage-control');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves the project intelligence configuration for Google Cloud Storage.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the intelligence config, typically 'global'.
 */
async function getProjectIntelligenceConfig(projectId, locationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/intelligenceConfig`;
    const [response] = await client.getProjectIntelligenceConfig({name});

    console.log(`Project Intelligence Config Name: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Intelligence configuration resource was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied to intelligence configuration: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getProjectIntelligenceConfig };
// [END storage_v2_storagecontrol_projectintelligenceconfig_get]
