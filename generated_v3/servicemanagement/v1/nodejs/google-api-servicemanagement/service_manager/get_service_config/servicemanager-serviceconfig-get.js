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

// [START servicemanagement_v1_servicemanager_serviceconfig_get]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Retrieves the configuration for a managed service.
 *
 * @param {string} configId - The server-generated ID of the service configuration resource.
 * @param {string} serviceName - The name of the managed service (for example, 'example.googleapis.com').
 */
async function getServiceConfig(configId, serviceName) {
  try {
    const request = {
      serviceName,
      configId,
    };

    const [response] = await client.getServiceConfig(request);

    console.log(`Service Name: ${response.name}`);
    console.log(`Configuration ID: ${response.id}`);
    console.log(`Title: ${response.title}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { getServiceConfig };
// [END servicemanagement_v1_servicemanager_serviceconfig_get]
