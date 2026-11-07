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

// [START servicedirectory_v1beta1_registrationservice_service_get]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Retrieves a Service Directory service.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location where the namespace and service reside (for example, 'us-central1').
 * @param {string} namespaceId - The ID of the parent namespace containing the service. Must comply with RFC 1035 (1-63 lowercase alphanumeric characters or hyphens).
 * @param {string} serviceId - The ID of the service to retrieve. Must comply with RFC 1035 (1-63 lowercase alphanumeric characters or hyphens).
 */
async function getService(projectId, locationId, namespaceId, serviceId) {
  try {
    const name = client.servicePath(
      projectId,
      locationId,
      namespaceId,
      serviceId
    );

    const [service] = await client.getService({name});

    console.log(`Service name: ${service.name}`);
    return service;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getService };
// [END servicedirectory_v1beta1_registrationservice_service_get]
