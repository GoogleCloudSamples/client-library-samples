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

// [START cloudrun_v2_services_service_delete_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Deletes a Cloud Run service.
 *
 * This sample demonstrates how to delete a Cloud Run service.
 * The deletion is a long-running operation that can take some time to complete.
 *
 * @param {string} projectId Your Google Cloud project ID.
 *     Example: 'your-project-id'
 * @param {string} location The Google Cloud region where the service is located.
 *     Example: 'us-central1'
 * @param {string} serviceName The name of the service to delete.
 *     Example: 'my-deleted-service'
 */
async function deleteService(
  projectId = 'your-project-id',
  location = 'us-central1',
  serviceName = 'my-deleted-service',
) {
  // Construct the full resource name of the service.
  const name = `projects/${projectId}/locations/${location}/services/${serviceName}`;

  const request = {
    name,
    // Setting validateOnly to true will validate the request without actually
    // performing the deletion, which can be useful for testing permissions.
    validateOnly: false,
    // Optional: Provide an etag to ensure the deletion only happens if the
    // resource has not been modified since it was last fetched.
    // For example, you might fetch the service first to get its current etag:
    // const [existingService] = await client.getService({name: name});
    // etag: existingService.etag,
  };

  try {
    // The deleteService method returns a long-running operation.
    // We await its completion to ensure the service is fully deleted.
    console.log(`Deleting service: ${name}...`);
    const [operation] = await client.deleteService(request);
    const [service] = await operation.promise();

    console.log(`Service ${service.name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Service ${serviceName} not found in location ${location} of project ${projectId}. ` +
          'It may have already been deleted or the name is incorrect.',
      );
    } else {
      console.error(`Error deleting service ${serviceName}:`, err);
      // For other errors, log the error and provide guidance.
      // Developers might want to handle specific error codes (e.g., PERMISSION_DENIED)
      // to provide more targeted feedback to the user.
    }
  }
}

// [END cloudrun_v2_services_service_delete_async]

module.exports = {
  deleteService,
};
