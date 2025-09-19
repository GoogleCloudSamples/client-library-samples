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

const process = require('process');

// [START storage_v2_storagecontrol_projectintelligenceconfig_update_async]
const {StorageControlClient} = require('@google-cloud/storage-control').v2;
const {FieldMask} = require('google-protobuf/google/protobuf/field_mask_pb');
const {status} = require('@grpc/grpc-js');

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
 * @param {number} editionConfig The new edition configuration. Use 3 for STANDARD, 2 for DISABLED.
 *   Example: 3
 */
async function updateProjectIntelligenceConfig(
  projectId,
  location = 'global',
  editionConfig
) {
  // The name of the IntelligenceConfig resource.
  // Format: `projects/{project_number}/locations/{location}/intelligenceConfig`
  const name = `projects/${projectId}/locations/${location}/intelligenceConfig`;

  // Create the FieldMask to specify which fields to update.
  // In this case, we are only updating the 'edition_config' field.
  const updateMask = new FieldMask();
  updateMask.addPaths('edition_config');

  const request = {
    intelligenceConfig: {
      name: name,
      editionConfig: editionConfig,
    },
    updateMask: updateMask,
  };

  try {
    const [response] = await client.updateProjectIntelligenceConfig(request);
    console.log(
      `Successfully updated Project Intelligence Config for project ${projectId}:`
    );
    console.log(`Name: ${response.name}`);
    console.log(`Edition Config: ${response.editionConfig}`);
    // The updateTime is a Timestamp object, convert to Date for readability.
    console.log(`Update Time: ${response.updateTime.toDate()}`);
    if (response.effectiveIntelligenceConfig) {
      console.log(
        `Effective Edition: ${response.effectiveIntelligenceConfig.effectiveEdition}`
      );
      console.log(
        `Applied Intelligence Config: ${response.effectiveIntelligenceConfig.intelligenceConfig}`
      );
    }
  } catch (err) {
    // Handle specific API errors
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Intelligence Config not found for project ${projectId} in location ${location}.`
      );
      console.error(
        'Please ensure the project ID and location are correct, and that the Storage Control API is enabled.'
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error: Invalid argument provided: ${err.details}. Please check the editionConfig value.`
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied. Ensure the service account has 'storage.intelligenceConfigs.update' permission for project ${projectId}.`
      );
    } else {
      console.error(
        `An unexpected error occurred while updating Project Intelligence Config for project ${projectId}:`,
        err
      );
    }
  }
}
// [END storage_v2_storagecontrol_projectintelligenceconfig_update_async]

async function main(args) {
  if (args.length < 3) {
    console.error(
      `Usage: node ${process.argv[1]} <projectId> <location> <editionConfig>`
    );
    console.error(`
To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (e.g., 'your-project-id')
 - Google Cloud Location (e.g., 'global')
 - Edition Configuration (e.g., 3 for STANDARD, 2 for DISABLED)
`);
    process.exit(1);
  }
  const projectId = args[0];
  const location = args[1];
  // Parse editionConfig as an integer
  const editionConfig = parseInt(args[2], 10);

  if (isNaN(editionConfig)) {
    console.error('Error: editionConfig must be a number.');
    process.exit(1);
  }

  try {
    await updateProjectIntelligenceConfig(projectId, location, editionConfig);
  } catch (err) {
    console.error(`Failed to execute sample: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2)).catch(err => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
}

module.exports = {updateProjectIntelligenceConfig};
