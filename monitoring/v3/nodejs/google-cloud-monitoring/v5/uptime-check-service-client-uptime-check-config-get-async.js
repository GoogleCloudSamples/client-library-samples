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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_get_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Gets a single Uptime check configuration by its name.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-123')
 * @param {string} uptimeCheckConfigId The ID of the Uptime check configuration to retrieve (for example, 'your-uptime-check-id')
 */
async function getUptimeCheckConfig(
  projectId,
  uptimeCheckConfigId = 'your-uptime-check-id',
) {
  const name = client.projectUptimeCheckConfigPath(
    projectId,
    uptimeCheckConfigId,
  );

  const request = {
    name,
  };

  try {
    const [uptimeCheckConfig] = await client.getUptimeCheckConfig(request);
    console.log(uptimeCheckConfig.name);
    console.log(`	Display Name: ${uptimeCheckConfig.displayName}`);
    if (uptimeCheckConfig.httpCheck) {
      console.log(`	HTTP Check Path: ${uptimeCheckConfig.httpCheck.path}`);
    } else if (uptimeCheckConfig.tcpCheck) {
      console.log(`	TCP Check Port: ${uptimeCheckConfig.tcpCheck.port}`);
    }
    if (uptimeCheckConfig.monitoredResource) {
      console.log(
        `	Monitored Resource Type: ${uptimeCheckConfig.monitoredResource.type}`,
      );
      console.log(
        `	Monitored Resource Labels: ${JSON.stringify(
          uptimeCheckConfig.monitoredResource.labels,
        )}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Uptime check configuration ${uptimeCheckConfigId} not found in project ${projectId}.`,
      );
      console.error('Make sure the uptimeCheckConfigId is correct and exists.');
    } else {
      console.error('Error getting Uptime check configuration:', err.message);
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getUptimeCheckConfig(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Uptime Check ID like 'your-uptime-check-id'

  Usage:

   node uptime-check-service-client-uptime-check-config-get-async.js example-project-168 your-uptime-check-id
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getUptimeCheckConfig};
