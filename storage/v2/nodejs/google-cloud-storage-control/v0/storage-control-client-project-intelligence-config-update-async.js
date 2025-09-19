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

// [START storage_v2_storagecontrol_projectintelligenceconfig_update_async]
const { protos } = require('@google-cloud/storage-control');
const { StorageControlClient } = require('@google-cloud/storage-control').v2;
const { FieldMask } = require('google-protobuf/google/protobuf/field_mask_pb');
const { status } = require('@grpc/grpc-js');

// The StorageControlClient should be instantiated once and reused throughout the application.
// This helps manage connections and credentials efficiently.
const client = new StorageControlClient();

/**
 * Updates the Project-scoped singleton IntelligenceConfig resource.
 *
 * This sample demonstrates how to enable or disable Storage Intelligence features
 * for a specific Google Cloud Project by updating its IntelligenceConfig.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} location The location of the intelligence config (e.g., 'global')
 */
async function updateProjectIntelligenceConfig(projectId, location = 'global') {
  // The name of the IntelligenceConfig resource.
  const name = `projects/${projectId}/locations/${location}/intelligenceConfig`;

  // Create the FieldMask to specify which fields to update.
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
    updateMask: { paths: updateMask.getPathsList() },
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
    // Handle specific API errors
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
// [END storage_v2_storagecontrol_projectintelligenceconfig_update_async]

async function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  await updateProjectIntelligenceConfig(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`
To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (e.g., 'your-project-id')
 - Google Cloud Location (e.g., 'global')
Usage:
 node storage-control-client-project-intelligence-config-update-async.js your-project-id global ENTERPRISE_PLUS
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = { updateProjectIntelligenceConfig };
