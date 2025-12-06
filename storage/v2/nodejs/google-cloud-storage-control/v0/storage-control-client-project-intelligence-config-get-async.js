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

// [START storage_v2_storagecontrol_projectintelligenceconfig_get_async]
const { StorageControlClient } = require('@google-cloud/storage-control').v2;
const { status } = require('@grpc/grpc-js');

const client = new StorageControlClient();

/**
 * Retrieves the Project-scoped singleton IntelligenceConfig resource.
 *
 * The IntelligenceConfig resource allows you to configure settings related to
 * Storage Intelligence features for a given project, folder, or organization.
 * This sample demonstrates how to fetch the configuration for a specific project.
 *
 * @param {string} projectId The ID of your Google Cloud project (e.g., 'your-project-id').
 */
async function getProjectIntelligenceConfigSample(projectId) {
  const name = `projects/${projectId}/locations/global/intelligenceConfig`;

  const request = {
    name: name,
  };

  try {
    const [response] = await client.getProjectIntelligenceConfig(request);
    console.log('Successfully retrieved Project Intelligence Config:');
    console.log(`Name: ${response.name}`);
    console.log(`Edition Config: ${response.editionConfig}`);
    if (response.updateTime) {
      console.log(
        `Last Updated: ${new Date(response.updateTime.seconds * 1000)}`,
      );
    }
    if (response.effectiveIntelligenceConfig) {
      console.log(
        `Effective Edition: ${response.effectiveIntelligenceConfig.effectiveEdition}`,
      );
    }
    if (response.trialConfig && response.trialConfig.expireTime) {
      console.log(
        `Trial Expires: ${new Date(response.trialConfig.expireTime.seconds * 1000)}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `IntelligenceConfig for project ${projectId} not found. It might not be enabled or configured.`,
      );
    } else {
      console.error(
        `Error getting Project Intelligence Config for project ${projectId}:`,
        err,
      );
    }
    throw err;
  }
}
// [END storage_v2_storagecontrol_projectintelligenceconfig_get_async]

async function main(args) {
  if (args.length < 1) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await getProjectIntelligenceConfigSample(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
 - Google Cloud Project like 'example-project-168'
Usage:
  node storage-control-client-project-intelligence-config-get-async.js example-project-168`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = { getProjectIntelligenceConfigSample };
