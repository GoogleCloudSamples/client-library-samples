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

// [START run_v2_services_service_delete]
'use strict';

const {ServicesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Use the deleteService method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serviceId - ID of the Service (for example, 'example-service-id')
 */
async function deleteService(projectId, locationId, serviceId) {
  try {
    const name = client.servicePath(projectId, locationId, serviceId);

    const [operation] = await client.deleteService({
      name,
    });

    const [response] = await operation.promise();
    console.log(`Deleted service: ${response.name || name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service does not exist: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting service: ${name}`);
    } else {
      console.error(`Failed to delete service: ${err.message}`);
    }
  }
}

module.exports = { deleteService };
// [END run_v2_services_service_delete]
