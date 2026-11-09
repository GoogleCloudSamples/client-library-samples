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

// [START servicedirectory_v1beta1_registrationservice_service_delete]
'use strict';

const {RegistrationServiceClient} = require('@google-cloud/service-directory');
const {status} = require('@grpc/grpc-js');

const client = new RegistrationServiceClient();

/**
 * Use the deleteService method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the Service Directory resource (e.g., 'us-central1').
 * @param {string} namespaceId - The ID of the Service Directory namespace.
 * @param {string} serviceId - The ID of the Service Directory service to delete.
 */
async function deleteService(projectId, locationId, namespaceId, serviceId) {
  const name = `projects/${projectId}/locations/${locationId}/namespaces/${namespaceId}/services/${serviceId}`;

  try {
    const request = {
      name,
    };

    await client.deleteService(request);
    console.log(`Deleted service: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found at ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while attempting to delete service at ${name}`);
    } else {
      console.error(`Failed to delete service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteService };
// [END servicedirectory_v1beta1_registrationservice_service_delete]
