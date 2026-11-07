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

// [START servicedirectory_v1beta1_registrationservice_endpoint_get]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the getEndpoint method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location (for example, 'us-central1').
 * @param {string} namespaceId - The caller-chosen identifier of the parent namespace, matching RFC-1035 (`^[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?$`).
 * @param {string} serviceId - The caller-chosen identifier of the parent service, matching RFC-1035 (`^[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?$`).
 * @param {string} endpointId - The caller-chosen identifier of the endpoint to retrieve, matching RFC-1035 (`^[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?$`).
 */
async function getEndpoint(projectId, locationId, namespaceId, serviceId, endpointId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}/services/${serviceId}/endpoints/${endpointId}`;

    const [endpoint] = await client.getEndpoint({
      name,
    });

    console.log(`Endpoint name: ${endpoint.name}`);
    console.log(`Address: ${endpoint.address}`);
    console.log(`Port: ${endpoint.port}`);

    return endpoint;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Endpoint not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing endpoint: ${err.message}`);
    } else {
      console.error(`Failed to retrieve endpoint: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getEndpoint };
// [END servicedirectory_v1beta1_registrationservice_endpoint_get]
