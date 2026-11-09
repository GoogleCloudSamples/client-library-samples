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

// [START servicedirectory_v1_registrationservice_service_create]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Creates a Service Directory service within a specified namespace.
 *
 * @param {string} serviceId - The caller-chosen resource ID for the service to be created. Must be 1-63 characters, start with a lowercase letter, and contain lowercase letters, numbers, or dashes, ending with a lowercase letter or digit.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Service Directory namespace resides (for example, 'us-central1').
 * @param {string} namespaceId - The ID of the parent Service Directory namespace.
 */
async function createService(serviceId, projectId, locationId, namespaceId) {
  try {
    const parent = client.namespacePath(projectId, locationId, namespaceId);
    const service = {
      annotations: {
        environment: 'production',
        team: 'networking',
      },
    };

    const request = {
      parent,
      serviceId,
      service,
    };

    const [createdService] = await client.createService(request);
    console.log(`Created service: ${createdService.name}`);
    return createdService;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service ${serviceId} already exists in namespace ${namespaceId}.`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent namespace ${namespaceId} was not found in location ${locationId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating service ${serviceId}: ${err.message}`);
    } else {
      console.error(`Failed to create service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createService };
// [END servicedirectory_v1_registrationservice_service_create]
