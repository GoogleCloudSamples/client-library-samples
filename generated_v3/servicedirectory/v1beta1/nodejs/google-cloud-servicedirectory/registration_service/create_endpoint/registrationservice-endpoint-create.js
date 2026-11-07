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

// [START servicedirectory_v1beta1_registrationservice_endpoint_create]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the createEndpoint method
 *
 * @param {string} endpointId - Caller-specified ID for the endpoint, matching RFC 1035 naming requirements (for example, 'example-endpoint').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} namespaceId - The ID of the parent namespace.
 * @param {string} serviceId - The ID of the parent service.
 */
async function createEndpoint(endpointId, projectId, locationId, namespaceId, serviceId) {
  try {
    const parent = client.servicePath(
      projectId,
      locationId,
      namespaceId,
      serviceId
    );
    const endpoint = {
      address: '10.0.0.1',
      port: 80,
    };

    const [response] = await client.createEndpoint({
      parent,
      endpointId,
      endpoint,
    });

    console.log(`Created endpoint: ${response.name}`);
    console.log(`Address: ${response.address}`);
    console.log(`Port: ${response.port}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Endpoint ${endpointId} already exists in service ${serviceId}.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent service ${serviceId} does not exist.`);
    } else {
      console.error('Failed to create endpoint:', err.message || err);
    }
  }
}

module.exports = { createEndpoint };
// [END servicedirectory_v1beta1_registrationservice_endpoint_create]
