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

// [START cloudrun_v2_instances_instance_delete_async]
const {InstancesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// The client is instantiated as a global variable, as per the best practice.
const client = new InstancesClient();

/**
 * Deletes a Cloud Run instance.
 *
 * This function demonstrates how to delete a specific Cloud Run instance identified
 * by its project ID, location, and instance ID. Deleting an instance is an
 * asynchronous operation, and the method returns a long-running operation
 * which can be used to track the deletion progress.
 *
 * @param {string} projectId The Google Cloud Project ID. Example: 'my-project-id'
 * @param {string} locationId The Google Cloud region where the instance is located (e.g., 'us-central1'). Example: 'us-central1'
 * @param {string} instanceId The ID of the instance to delete (e.g., 'my-instance'). Example: 'my-instance'
 */
async function deleteInstance(projectId, locationId, instanceId) {
  // Construct the full resource name for the instance.
  const name = client.instancePath(projectId, locationId, instanceId);

  // Prepare the request object for deleting the instance.
  const request = {
    name,
    // Optional: Set to true to validate the request without actually performing the deletion.
    // validateOnly: true,
    // Optional: Provide an etag to ensure the deletion only proceeds if the resource
    // has not been modified by another operation since it was last fetched.
    // etag: 'some-etag-value',
  };

  try {
    // Act: Execute the API call to delete the instance.
    // This returns a long-running operation.
    const [operation] = await client.deleteInstance(request);

    // Wait for the long-running operation to complete.
    // The promise() method resolves when the deletion is finished.
    const [instance] = await operation.promise();

    // Assert: Log the successful outcome.
    console.log(`Instance ${instance.name} deleted successfully.`);
  } catch (err) {
    // Handle specific errors, such as the instance not being found.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Instance ${name} not found. It might have already been deleted or never existed. ` +
          'Please check the instance name and try again.',
      );
    } else {
      // Log other unexpected errors.
      console.error(`Error deleting instance ${name}:`, err);
      // In a production application, you might want to implement more sophisticated
      // error handling, such as retries for transient errors or alerting for critical failures.
    }
  }
}
// [END cloudrun_v2_instances_instance_delete_async]

module.exports = {
  deleteInstance,
};
