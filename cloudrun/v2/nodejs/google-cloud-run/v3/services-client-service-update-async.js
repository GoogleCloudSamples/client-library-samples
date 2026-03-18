// Copyright 2026 Google LLC
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

// [START cloudrun_v2_services_service_update_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// The client is instantiated once and can be reused across multiple calls.
const client = new ServicesClient();

/**
 * Updates an existing Cloud Run service with a new description and container image.
 *
 * This sample demonstrates updating specific fields of a Cloud Run service
 * using an update mask to ensure only the desired fields are modified.
 *
 * @param {string} projectId Your Google Cloud Project ID. (e.g., 'my-project-id')
 * @param {string} location The Google Cloud region where the service is located. (e.g., 'us-central1')
 * @param {string} serviceName The name of the Cloud Run service to update. (e.g., 'my-service')
 */
async function updateService(
  projectId = 'your-project-id',
  location = 'us-central1',
  serviceName = 'my-updated-service',
) {
  // Construct the full resource name for the service.
  const name = client.servicePath(projectId, location, serviceName);

  // Define the new description and container image.
  // These values are hard-coded for the sample but would typically come from
  // user input or configuration in a real application.
  const newDescription = 'This is an updated description for the service.';
  const newImage = 'us-docker.pkg.dev/cloudrun/container/hello:latest';

  // Construct the service object with the fields to update.
  // Only fields specified in the updateMask will be changed.
  const service = {
    name,
    description: newDescription,
    template: {
      containers: [
        {
          image: newImage,
        },
      ],
    },
  };

  // Specify the fields to be updated using a FieldMask.
  // This ensures that only 'description' and the first container's 'image' are modified.
  const request = {
    service,
    updateMask: {
      paths: ['description', 'template.containers[0].image'],
    },
    // Optional: If set to true, and if the Service does not exist, it will create
    // a new one. For this update sample, we assume the service already exists.
    // allowMissing: true,
  };

  try {
    // Make the API call to update the service.
    // The updateService method returns a long-running operation.
    const [operation] = await client.updateService(request);
    console.log(`Update operation for service ${serviceName} started.`);

    // Wait for the long-running operation to complete.
    // The promise() method resolves with the final state of the updated service.
    const [updatedService] = await operation.promise();

    console.log(`Service ${updatedService.name} updated successfully.`);
    console.log(`  New Description: ${updatedService.description}`);
    if (
      updatedService.template &&
      updatedService.template.containers &&
      updatedService.template.containers.length > 0
    ) {
      console.log(
        `  New Image: ${updatedService.template.containers[0].image}`,
      );
    }
  } catch (err) {
    // Handle potential API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Service '${serviceName}' not found in location '${location}' of project '${projectId}'. ` +
          'Please ensure the service exists before attempting to update it.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      // Catching PERMISSION_DENIED as a common user-correctable error.
      console.error(
        `Error: Permission denied when updating service '${serviceName}'. ` +
          `Ensure the service account has 'run.services.update' permission for project '${projectId}'.`,
      );
    } else {
      // Log any other unexpected errors.
      console.error(`Error updating service '${serviceName}':`, err);
    }
  }
}
// [END cloudrun_v2_services_service_update_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await updateService(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Service Name like 'my-updated-service'

Usage:

 node services-client-service-update-async.js my-project-id us-central1 my-updated-service
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  updateService,
};
