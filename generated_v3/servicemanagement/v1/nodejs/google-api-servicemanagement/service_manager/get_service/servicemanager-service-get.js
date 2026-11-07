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

// [START servicemanagement_v1_servicemanager_service_get]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the getService method
 *
 * @param {string} serviceName - Caller-specified name of an existing managed service to retrieve (for example, 'pubsub.googleapis.com').
 */
async function getService(serviceName) {
  try {
    const request = {
      serviceName,
    };

    const [response] = await client.getService(request);

    console.log(`Service name: ${response.serviceName}`);
    console.log(`Producer project ID: ${response.producerProjectId}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${serviceName}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for service: ${serviceName}`);
    } else {
      console.error(`Error retrieving service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getService };
// [END servicemanagement_v1_servicemanager_service_get]
