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

// [START servicedirectory_v1_registrationservice_endpoint_create]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Creates an endpoint in a Service Directory service.
 *
 * @param {string} endpointId - The caller-chosen resource ID of the endpoint to create (for example, 'example-endpoint'). Must be 1-63 characters, start with a lowercase letter, and contain only lowercase letters, digits, or dashes.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} namespaceId - The resource ID of the existing parent namespace.
 * @param {string} serviceId - The resource ID of the existing parent service.
 */
async function createEndpoint(endpointId, projectId, locationId, namespaceId, serviceId) {
  try {
    const parent = client.servicePath(projectId, locationId, namespaceId, serviceId);
    const endpoint = {
      address: '10.0.0.1',
      port: 443,
    };

    const request = {
      parent,
      endpointId,
      endpoint,
    };

    const [response] = await client.createEndpoint(request);
    console.log(`Created endpoint: ${response.name}`);
    console.log(`Address: ${response.address}:${response.port}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Endpoint already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error creating endpoint: ${err.message}`);
    }
  }
}

module.exports = { createEndpoint };
// [END servicedirectory_v1_registrationservice_endpoint_create]
