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

// [START cloudrun_v2_services_service_create_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Creates a new Cloud Run service.
 *
 * This function demonstrates how to create a new Cloud Run service with a specified
 * container image. It handles cases where the service might already exist and
 * provides clear output upon successful creation or error.
 *
 * @param {string} [projectId='my-project-id'] The Google Cloud Project ID. For example, 'my-project-id'.
 * @param {string} [location='us-central1'] The Google Cloud region where the service will be created. For example, 'us-central1'.
 * @param {string} [serviceId='my-nodejs-service'] The unique identifier for the new service. For example, 'my-nodejs-service'.
 * @param {string} [imageUrl='gcr.io/cloudrun/hello'] The container image URL to deploy. For example, 'gcr.io/cloudrun/hello'.
 */
async function createService(
  projectId = 'my-project-id',
  location = 'us-central1',
  serviceId = 'my-nodejs-service',
  imageUrl = 'gcr.io/cloudrun/hello',
) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
    serviceId,
    service: {
      template: {
        containers: [
          {
            image: imageUrl,
          },
        ],
      },
      // Optional: Add labels to the service for organization and billing.
      // Labels are key-value pairs that help categorize resources.
      labels: {
        env: 'development',
        language: 'nodejs',
      },
      // Optional: Configure ingress traffic to allow all traffic by default.
      // Other options include 'INGRESS_TRAFFIC_ALL' or 'INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER_ONLY'.
      ingress: 'INGRESS_TRAFFIC_INTERNAL_ONLY',
    },
  };

  try {
    // Create the service using a long-running operation.
    // The operation object allows tracking the progress of the service creation.
    const [operation] = await client.createService(request);
    console.log(`Creating service ${serviceId} in ${location}...`);

    // Wait for the operation to complete and get the final service resource.
    const [service] = await operation.promise();
    console.log(`Service ${service.name} created successfully.`);
    console.log(`Service URL: ${service.uri}`);
  } catch (err) {
    // Handle specific error: ALREADY_EXISTS (gRPC status code 6).
    // This error indicates that a service with the given ID already exists.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Service "${serviceId}" already exists in location "${location}" of project "${projectId}".`,
      );
      console.log(
        'To update the existing service, use the updateService method or choose a different service ID.',
      );
    } else {
      // Handle other potential errors during service creation.
      console.error(`Error creating service "${serviceId}":`, err);
      // For production applications, you might want to log the full error details
      // and potentially retry the operation or alert an administrator.
    }
  }
}
// [END cloudrun_v2_services_service_create_async]

module.exports = {
  createService,
};
