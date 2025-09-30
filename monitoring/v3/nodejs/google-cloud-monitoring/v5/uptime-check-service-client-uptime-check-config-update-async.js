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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_update_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Updates an existing Uptime check configuration by changing its display name and timeout.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-123')
 * @param {string} uptimeCheckConfigId The ID of the Uptime check configuration to update (for example, 'your-uptime-check-id')
 */
async function updateUptimeCheckConfig(
  projectId,
  uptimeCheckConfigId = 'your-uptime-check-id',
) {
  const name = client.projectUptimeCheckConfigPath(
    projectId,
    uptimeCheckConfigId,
  );

  const newDisplayName = 'My Updated Uptime Check';
  const newTimeoutSeconds = 10; // New timeout of 10 seconds

  const uptimeCheckConfig = {
    name: name,
    displayName: newDisplayName,
    timeout: {
      seconds: newTimeoutSeconds,
    },
  };

  const updateMask = {
    paths: ['display_name', 'timeout'],
  };

  const request = {
    uptimeCheckConfig,
    updateMask,
  };

  try {
    const [updatedConfig] = await client.updateUptimeCheckConfig(request);

    console.log(updatedConfig.name);
    console.log(`	Display Name: ${updatedConfig.displayName}`);
    console.log(`	Timeout: ${updatedConfig.timeout?.seconds}s`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Uptime check configuration '${name}' not found. ` +
          `Make sure the uptimeCheckConfigId is correct and exists in project '${projectId}'.`,
      );
    } else {
      console.error(
        'Failed to update uptime check configuration:',
        err.message,
      );
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateUptimeCheckConfig(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Uptime Check ID like 'your-uptime-check-id'

  Usage:

   node uptime-check-service-client-uptime-check-config-update-async.js example-project-168 your-uptime-check-id
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {updateUptimeCheckConfig};
