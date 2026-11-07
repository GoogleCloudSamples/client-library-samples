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

// [START servicemanagement_v1_servicemanager_serviceconfig_create]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Creates a new service configuration for a managed service.
 *
 * @param {string} serviceName - The name of the service (for example, 'example.googleapis.com') for which to create the configuration.
 */
async function createServiceConfig(serviceName) {
  try {
    const projectId = await client.getProjectId();
    const serviceConfig = {
      name: serviceName,
      title: 'Example Service Configuration',
      producerProjectId: projectId,
    };

    const request = {
      serviceName,
      serviceConfig,
    };

    const [response] = await client.createServiceConfig(request);
    console.log(`Created service configuration with ID: ${response.id}`);
    console.log(`Service name: ${response.name}`);
    console.log(`Service title: ${response.title}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${serviceName}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service configuration already exists: ${serviceName}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied creating configuration: ${err.message}`);
    } else {
      console.error(`Failed to create service configuration: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createServiceConfig };
// [END servicemanagement_v1_servicemanager_serviceconfig_create]
