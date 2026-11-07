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

// [START servicedirectory_v1_registrationservice_service_update]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the updateService method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID.
 * @param {string} namespaceId - The Service Directory namespace ID.
 * @param {string} serviceId - The Service Directory service ID to update.
 */
async function updateService(projectId, locationId, namespaceId, serviceId) {
  try {
    const service = {
      name: `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}/services/${serviceId}`,
      annotations: {
        updated_key: 'updated_value',
      },
    };
    const updateMask = {
      paths: ['annotations'],
    };

    const request = {
      service,
      updateMask,
    };

    const [response] = await client.updateService(request);
    console.log(`Updated service: ${response.name}`);
    console.log(`Annotations: ${JSON.stringify(response.annotations)}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateService };
// [END servicedirectory_v1_registrationservice_service_update]
