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

// [START servicedirectory_v1_registrationservice_endpoint_update]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the updateEndpoint method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 * @param {string} namespaceId - The ID of the Service Directory namespace.
 * @param {string} serviceId - The ID of the Service Directory service.
 * @param {string} endpointId - The ID of the endpoint to update.
 */
async function updateEndpoint(projectId, locationId, namespaceId, serviceId, endpointId) {
  try {
    const endpointName = client.endpointPath(
      projectId,
      locationId,
      namespaceId,
      serviceId,
      endpointId
    );

    const updateMask = {
      paths: ['port'],
    };

    const endpoint = {
      name: endpointName,
      port: 8080,
    };

    const request = {
      endpoint,
      updateMask,
    };

    const [response] = await client.updateEndpoint(request);
    console.log(`Updated endpoint: ${response.name}`);
    console.log(`Port: ${response.port}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateEndpoint };
// [END servicedirectory_v1_registrationservice_endpoint_update]
