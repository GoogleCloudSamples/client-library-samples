// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START storage_v2_storagecontrol_projectintelligenceconfig_update]
// [START storage_storagecontrol_projectintelligenceconfig_update]
// [START storage_control_projectintelligenceconfig_update]
const {protos} = require('@google-cloud/storage-control');
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {FieldMask} = require('google-protobuf/google/protobuf/field_mask_pb');
const {status} = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Updates the Project-scoped singleton IntelligenceConfig resource.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} location The location of the intelligence config (e.g., 'global')
 */
async function updateProjectIntelligenceConfig(projectId, location = 'global') {
  //Example: projects/${projectId}/locations/${location}/intelligenceConfig;
  const name = client.projectLocationIntelligenceConfigPath(
    projectId,
    location,
  );

  // In this case, we are only updating the 'edition_config' field.
  const updateMask = new FieldMask();
  updateMask.addPaths('edition_config');

  const request = {
    intelligenceConfig: {
      name: name,
      editionConfig:
        protos.google.storage.control.v2.IntelligenceConfig.EditionConfig
          .DISABLED,
    },
    updateMask: {paths: updateMask.getPathsList()},
  };

  try {
    const [response] = await client.updateProjectIntelligenceConfig(request);
    console.log(
      `Successfully updated Project Intelligence Config for project ${projectId}:`,
    );
    console.log(`Name: ${response.name}`);
    console.log(`Edition Config: ${response.editionConfig}`);
    console.log(`Update Time: ${new Date(response.updateTime.seconds * 1000)}`);
    if (response.effectiveIntelligenceConfig) {
      console.log(
        `Effective Edition: ${response.effectiveIntelligenceConfig.effectiveEdition}`,
      );
      console.log(
        `Applied Intelligence Config: ${response.effectiveIntelligenceConfig.intelligenceConfig}`,
      );
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied. Ensure the service account has 'storage.intelligenceConfigs.update' permission for project ${projectId} and verify the location is correct.`,
      );
    } else {
      console.error(
        `An unexpected error occurred while updating Project Intelligence Config for project ${projectId}:`,
        err,
      );
    }
  }
}
// [END storage_control_projectintelligenceconfig_update]
// [END storage_storagecontrol_projectintelligenceconfig_update]
// [END storage_v2_storagecontrol_projectintelligenceconfig_update]

module.exports = {
  updateProjectIntelligenceConfig,
};
