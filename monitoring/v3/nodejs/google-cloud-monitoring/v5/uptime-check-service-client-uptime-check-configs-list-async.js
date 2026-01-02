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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfigs_list_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Lists all Uptime check configurations for a given Google Cloud Project.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-123')
 */
async function listUptimeCheckConfigs(projectId) {
  const request = {
    parent: `projects/${projectId}`,
  };

  try {
    const [uptimeCheckConfigs] = await client.listUptimeCheckConfigs(request);

    if (uptimeCheckConfigs.length === 0) {
      console.log(
        `No Uptime check configurations found for project ${projectId}.`,
      );
      return;
    }

    console.log('Uptime Check Configurations:');
    for (const config of uptimeCheckConfigs) {
      console.log(`	Name: ${config.name}`);
      console.log(`	Display Name: ${config.displayName}`);
      if (config.httpCheck) {
        console.log(
          `	HTTP Check Target: ${config.httpCheck.host || config.httpCheck.path}`,
        );
      } else if (config.tcpCheck) {
        console.log(`	TCP Check Target: ${config.tcpCheck.port}`);
      }
      console.log(`	Period: ${config.period?.seconds} seconds`);
      console.log(`	Regions: ${config.selectedRegions?.join(', ')}`);
      console.log(`	Timeout: ${config.timeout?.seconds} seconds`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or inaccessible. ` +
          'Make sure the project ID is correct and the service account has the necessary permissions (for example, Monitoring Viewer).',
      );
    } else {
      console.error('Error listing Uptime check configurations:', err.message);
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfigs_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listUptimeCheckConfigs(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify one argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node uptime-check-service-client-uptime-check-configs-list-async.js example-project-168
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listUptimeCheckConfigs};
