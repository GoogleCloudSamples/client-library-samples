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

// [START servicedirectory_v1_registrationservice_endpoints_list]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

/**
 * Lists endpoints within a Service Directory service.
 */
async function listEndpoints() {
  const client = new RegistrationServiceClient();

  try {
    let projectId =
      process.env.PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      try {
        projectId = await client.getProjectId();
      } catch {
        projectId = 'example-project-id';
      }
    }

    const locationId =
      process.env.LOCATION_ID ||
      process.env.LOCATION ||
      process.env.GOOGLE_CLOUD_LOCATION ||
      'us-central1';
    const namespaceId =
      process.env.NAMESPACE_ID ||
      process.env.NAMESPACE ||
      process.env.SERVICE_DIRECTORY_NAMESPACE ||
      'example-namespace-id';
    const serviceId =
      process.env.SERVICE_ID ||
      process.env.SERVICE ||
      process.env.SERVICE_DIRECTORY_SERVICE ||
      'example-service-id';

    const parent =
      process.env.PARENT ||
      client.servicePath(
        projectId,
        locationId,
        namespaceId,
        serviceId
      );

    const [endpoints] = await client.listEndpoints({parent});

    console.log(`Listed endpoints for service: ${parent}`);
    for (const endpoint of endpoints) {
      console.log(`Endpoint: ${endpoint.name}`);
      console.log(`Address: ${endpoint.address}`);
      console.log(`Port: ${endpoint.port}`);
    }
    if (endpoints.length === 0) {
      console.log('No endpoints found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Service Directory API error: ${err.message}`);
    }
  }
}

module.exports = {listEndpoints};
// [END servicedirectory_v1_registrationservice_endpoints_list]
