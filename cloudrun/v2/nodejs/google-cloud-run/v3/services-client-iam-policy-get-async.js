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

// [START cloudrun_v2_services_iampolicy_get_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // Import status codes for error handling

// Instantiates a client
const client = new ServicesClient();

/**
 * Retrieves the IAM policy for a Cloud Run service.
 *
 * This sample demonstrates how to fetch the IAM policy associated with a
 * specific Cloud Run service. The IAM policy defines who has what permissions
 * on the service, controlling access to the service.
 *
 * @param {string} projectId The Google Cloud Project ID (e.g., 'my-project-id').
 * @param {string} location The Google Cloud region where the service is located (e.g., 'us-central1').
 * @param {string} serviceId The ID of the service to retrieve the IAM policy for (e.g., 'my-service').
 */
async function getServiceIamPolicy(projectId, location, serviceId) {
  // Construct the full resource name for the service.
  // Example: projects/my-project-id/locations/us-central1/services/my-service
  const resourceName = client.servicePath(projectId, location, serviceId);

  const request = {
    resource: resourceName,
  };

  try {
    // Make the API call to get the IAM policy.
    const [policy] = await client.getIamPolicy(request);

    console.log(
      `IAM Policy for service "${serviceId}" in project "${projectId}", location "${location}":`,
    );
    console.log(JSON.stringify(policy, null, 2));
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Service "${serviceId}" not found in project "${projectId}", location "${location}".`,
      );
      console.error(
        'Please ensure the service ID and location are correct and the service exists.',
      );
    } else {
      // Log other unexpected errors.
      console.error('Error getting IAM policy:', err.message);
      // For less common or complex errors, you might want to inspect `err.details`
      // or `err.metadata` for more diagnostic information.
    }
  }
}
// [END cloudrun_v2_services_iampolicy_get_async]

module.exports = {
  getServiceIamPolicy,
};
