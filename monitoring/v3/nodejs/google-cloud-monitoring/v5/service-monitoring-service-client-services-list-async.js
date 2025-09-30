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

// [START monitoring_v3_servicemonitoringservice_services_list_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Lists all services in the specified Google Cloud project.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function listServices(projectId) {
  const parent = `projects/${projectId}`;

  const request = {
    parent,
  };

  try {
    const [services] = await client.listServices(request);

    if (services.length === 0) {
      console.log(`No services found in project ${projectId}.`);
      return;
    }

    console.log('Services found:');
    for (const service of services) {
      console.log(service.name);
      console.log(`	Display Name: ${service.displayName || 'N/A'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' not found or you do not have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and the service account has the "Monitoring Viewer" role.',
      );
    } else {
      console.error('Error listing services:', err);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_services_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listServices(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify a project ID:
    Usage: node ${process.argv[1]} <projectId>`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listServices,
};
