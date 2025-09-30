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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_delete_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Deletes an existing Uptime check configuration.
 *
 * Deleting an Uptime check configuration fails if it is referenced by an
 * alert policy or other dependent configurations.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} uptimeCheckConfigId The ID of the Uptime check configuration to delete (for example, 'your-uptime-check-id')
 */
async function deleteUptimeCheckConfig(
  projectId,
  uptimeCheckConfigId = 'your-uptime-check-config-id',
) {
  const name = client.projectUptimeCheckConfigPath(
    projectId,
    uptimeCheckConfigId,
  );

  const request = {
    name,
  };

  try {
    await client.deleteUptimeCheckConfig(request);
    console.log(
      `Uptime check configuration ${uptimeCheckConfigId} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Uptime check configuration ${uptimeCheckConfigId} not found. ` +
          'It may have already been deleted or never existed.',
      );
    } else {
      console.error(
        `Error deleting uptime check configuration ${uptimeCheckConfigId}:`,
        err.message,
      );
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_delete_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteUptimeCheckConfig(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Uptime Check ID like 'your-uptime-check-config-id'

  Usage:

   node uptime-check-service-client-uptime-check-config-delete-async.js example-project-168 your-uptime-check-config-id
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {deleteUptimeCheckConfig};
