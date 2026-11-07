// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START servicemanagement_v1_servicemanager_service_create]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the createService method
 *
 * @param {string} projectId - The Google Cloud project ID that produces and owns this managed service.
 * @param {string} serviceId - The caller-chosen name of the service to create, formatted as a DNS-compatible service name (e.g. 'endpoints.example-project.cloud.goog').
 */
async function createService(projectId, serviceId) {
  try {
    const service = {
      serviceName: serviceId,
      producerProjectId: projectId,
    };

    // Initiate the long-running operation to create the managed service
    const [operation] = await client.createService({service});

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Created managed service: ${response.serviceName}`);
    console.log(`Producer project: ${response.producerProjectId}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service already exists: ${serviceId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating service: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Service creation failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createService };
// [END servicemanagement_v1_servicemanager_service_create]
