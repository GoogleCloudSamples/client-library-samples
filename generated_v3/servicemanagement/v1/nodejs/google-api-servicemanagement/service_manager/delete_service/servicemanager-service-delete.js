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

// [START servicemanagement_v1_servicemanager_service_delete]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Use the deleteService method
 *
 * @param {string} serviceName - The name of the managed service to delete (for example, `example.googleapis.com`).
 */
async function deleteService(serviceName) {
  try {
    const request = {
      serviceName,
    };

    // Initiates a long-running operation to soft-delete the service
    const [operation] = await client.deleteService(request);
    const [response] = await operation.promise();

    console.log(`Deleted service: ${serviceName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${serviceName}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting service: ${serviceName}`);
    } else {
      console.error(`Failed to delete service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteService };
// [END servicemanagement_v1_servicemanager_service_delete]
