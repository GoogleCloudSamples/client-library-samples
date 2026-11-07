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

// [START servicedirectory_v1_registrationservice_endpoint_get]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Retrieves an endpoint from a Service Directory service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region hosting the Service Directory namespace.
 * @param {string} namespaceId - The ID of the parent namespace. Must be 1-63 characters, conforming to RFC 1035.
 * @param {string} serviceId - The ID of the parent service. Must be 1-63 characters, conforming to RFC 1035.
 * @param {string} endpointId - The ID of the endpoint to retrieve. Must be 1-63 characters, conforming to RFC 1035.
 */
async function getEndpoint(projectId, locationId, namespaceId, serviceId, endpointId) {
  const name = `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}/services/${serviceId}/endpoints/${endpointId}`;

  try {
    const [endpoint] = await client.getEndpoint({name});

    console.log(`Endpoint retrieved: ${endpoint.name}`);
    console.log(`IP Address: ${endpoint.address}`);
    console.log(`Port: ${endpoint.port}`);

    return endpoint;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing endpoint: ${name}`);
    } else {
      console.error(`API error retrieving endpoint: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEndpoint };
// [END servicedirectory_v1_registrationservice_endpoint_get]
