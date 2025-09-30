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

// [START monitoring_v3_servicemonitoringservice_service_update_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Updates an existing Service in Google Cloud Monitoring.
 *
 * This sample demonstrates how to update a custom service's display name and user labels.
 * The `updateService` method allows partial updates by specifying an `updateMask`.
 * This is crucial for avoiding unintended overwrites of other service properties.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} serviceId The ID of the service to update (for example, 'your-custom-service-123')
 */
async function updateService(projectId, serviceId = 'your-custom-service-123') {
  const serviceName = client.projectServicePath(projectId, serviceId);

  // For a custom service, the 'custom' field must be present, even if empty,
  // to correctly identify the service type during the update operation.
  const updatedService = {
    name: serviceName,
    displayName: 'My Updated Custom Service Name',
    userLabels: {
      env: 'production',
      version: '2.0',
    },
    custom: {}, // Required to identify as a custom service
  };

  const updateMask = {
    paths: ['display_name', 'user_labels'],
  };

  const request = {
    service: updatedService,
    updateMask,
  };

  try {
    const [response] = await client.updateService(request);
    console.log(response.name);
    console.log(`	Display Name: ${response.displayName}`);
    console.log(`	User Labels: ${JSON.stringify(response.userLabels)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Service '${serviceId}' not found in project '${projectId}'. ` +
          'Make sure the service exists before attempting to update it. ' +
          'You might need to create the service first if it does not exist.',
      );
    } else {
      console.error(`Error updating service '${serviceId}': ${err.message}`);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateService(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, providing the following arguments:
         - Google Cloud Project ID like 'example-project-id'
         - Service ID like 'your-custom-service-123'

Usage:

      node updateService.js <PROJECT_ID> <SERVICE_ID>`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateService,
};
