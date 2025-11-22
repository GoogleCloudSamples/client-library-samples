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

// Imports for command-line execution (outside region tag)
const process = require('process');

// [START monitoring_v3_servicemonitoringservice_service_delete_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Deletes a Service.
 *
 * This sample demonstrates how to delete a Service using the Cloud Monitoring API.
 * Services are used to organize and monitor your applications and infrastructure.
 * Deleting a service will also delete its associated Service Level Objectives (SLOs).
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id').
 * @param {string} serviceId The ID of the service to delete (for example, 'your-custom-service').
 */
async function deleteService(projectId, serviceId = 'your-custom-service') {
  const name = `projects/${projectId}/services/${serviceId}`;

  const request = {
    name,
  };

  try {
    await client.deleteService(request);
    console.log(`Service ${serviceId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Service ${serviceId} not found under project ${projectId}. It may have already been deleted.`,
      );
    } else {
      console.error(`Error deleting service ${serviceId}:`, err);
      console.error(
        'Make sure the service name is correct and the service exists.',
      );
      console.error(
        'Also, verify that the service account has the necessary permissions (for example, "Monitoring Editor").',
      );
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_delete_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteService(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Service ID like 'your-custom-service'

Usage:

 node deleteService.js example-project-id your-custom-service
`,
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteService,
};
