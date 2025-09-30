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

// [START monitoring_v3_uptimecheckservice_uptimecheckconfig_create_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Creates a new Uptime check configuration for a specified project.
 *
 * An Uptime check monitors the availability of a resource, such as a website or a server.
 * This sample creates an HTTP uptime check for a public URL.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-project-123')
 * @param {string} uptimeCheckId A unique identifier for the uptime check configuration (for example, 'your-website-check')
 */
async function createUptimeCheckConfig(
  projectId,
  uptimeCheckId = 'your-website-check',
) {
  const parent = `projects/${projectId}`;

  const request = {
    parent,
    uptimeCheckConfig: {
      displayName: `My Uptime Check for ${uptimeCheckId}`,
      monitoredResource: {
        type: 'uptime_url',
        labels: {
          host: 'example.com',
        },
      },
      httpCheck: {
        path: '/',
        port: 80,
        useSsl: false,
      },
      period: {
        seconds: 300, // Check every 5 minutes
      },
      timeout: {
        seconds: 10, // Timeout after 10 seconds
      },
      selectedRegions: ['USA_VIRGINIA', 'USA_OREGON', 'EUROPE', 'ASIA_PACIFIC'],
    },
  };

  try {
    const [uptimeCheckConfig] = await client.createUptimeCheckConfig(request);
    console.log(uptimeCheckConfig.name);
    console.log(`	Display Name: ${uptimeCheckConfig.displayName}`);
    console.log(`	Host: ${uptimeCheckConfig.monitoredResource.labels.host}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Uptime check config with ID '${uptimeCheckId}' already exists in project '${projectId}'.`,
      );
      console.log(
        'Consider updating the existing config or choosing a different uptimeCheckId.',
      );
    } else {
      console.error('Failed to create uptime check config:', err.message);
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckconfig_create_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await createUptimeCheckConfig(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Uptime Check ID like 'your-website-check'

  Usage:

   node uptime-check-service-client-uptime-check-config-create-async.js example-project-168 your-website-check
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {createUptimeCheckConfig};
