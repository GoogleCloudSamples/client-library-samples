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

// [START cloudrun_v2_services_services_list_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Lists all Cloud Run services in a given project and location.
 *
 * This sample demonstrates how to list services using the `listServicesAsync`
 * method, which returns an asynchronous iterable. This approach is efficient
 * for handling large numbers of services as it processes them one by one,
 * avoiding loading all results into memory at once.
 *
 * @param {string} [projectId='your-project-id'] Your Google Cloud Project ID.
 * @param {string} [location='us-central1'] The Google Cloud region where the services are located (e.g., 'us-central1').
 */
async function listServices(
  projectId = 'your-project-id',
  location = 'us-central1',
) {
  // Construct the parent path for the request.
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
    // Optional: Set a small page size for demonstration purposes.
    // In a production environment, you might omit this to use the default
    // or set it based on your application's needs.
    pageSize: 10,
    // Optional: Include deleted services. Set to `true` to see services
    // that are in the process of being deleted but are not yet permanently removed.
    showDeleted: false,
  };

  try {
    console.log(
      `Listing services in project ${projectId} and location ${location}...`,
    );

    // The listServicesAsync method returns an AsyncIterable, which allows for
    // efficient iteration over potentially large result sets without loading
    // all results into memory at once. Each 'service' object represents
    // a Cloud Run service found in the specified location.
    for await (const service of client.listServicesAsync(request)) {
      console.log(`Found service: ${service.name}`);
      // Access other properties of the service object, for example:
      // console.log(`  URI: ${service.uri}`);
      // console.log(`  Status: ${service.terminalCondition?.state}`);
    }

    console.log('Finished listing services.');
  } catch (err) {
    // Handle common API errors.
    if (err.code === status.PERMISSION_DENIED) {
      console.error(
        'Error listing services: Permission denied. Please ensure the service account ' +
          "has the 'Cloud Run Viewer' role (roles/run.viewer) or equivalent permissions " +
          `for project ${projectId} in location ${location}.`,
      );
    } else if (err.code === status.NOT_FOUND) {
      console.error(
        `Error listing services: Location ${location} not found or invalid for project ` +
          `${projectId}. Please check the project ID and location for correctness.`,
      );
    } else {
      // For any other unexpected errors, log the full error object.
      console.error(
        'An unexpected error occurred while listing services:',
        err,
      );
    }
  }
}
// [END cloudrun_v2_services_services_list_async]

module.exports = {
  listServices,
};
