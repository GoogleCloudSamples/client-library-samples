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

// [START monitoring_v3_servicemonitoringservice_service_create_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Creates a new Service in a Google Cloud project.
 * This sample demonstrates how to create a custom service, which is a flexible
 * way to monitor services that don't fit into predefined types like App Engine or GKE.
 *
 * @param {string} projectId Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} serviceId A unique identifier for the service (for example, 'your-custom-service-123')
 */
async function createService(projectId, serviceId = 'your-custom-service-123') {
  const parent = `projects/${projectId}`;

  const service = {
    displayName: 'My Custom Monitoring Service',
    custom: {}, // An empty object for a Custom service type
  };

  const request = {
    parent,
    serviceId,
    service,
  };

  try {
    const [response] = await client.createService(request);
    console.log(response.name);
    console.log(`	Display Name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Service '${serviceId}' already exists in project '${projectId}'.`,
      );
      console.log(
        'Consider updating the existing service or choosing a different service ID.',
      );
    } else {
      console.error(`Error creating service '${serviceId}':`, err.message);
      console.error(
        'Please check your project ID, service ID, and permissions (monitoring.services.create).',
      );
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_create_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await createService(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Service ID like 'your-custom-service-123'

Usage:

 node service-monitoring-service-client-service-create-async.js <projectId> <serviceId>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createService,
};
