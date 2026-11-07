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

// [START monitoring_v3_servicemonitoringservice_service_delete]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Use the deleteService method
 *
 * @param {string} serviceId - The ID of the Service to delete (e.g., 'custom-service-1'). Can be caller-specified or server-generated; retrieve it from an existing Service via ListServices or GetService.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function deleteService(serviceId, projectId) {
  const name = `projects/${projectId}/services/${serviceId}`;

  try {
    const request = {
      name,
    };

    await client.deleteService(request);
    console.log(`Deleted service: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: unable to delete ${name}`);
    } else {
      console.error(`Failed to delete service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteService };
// [END monitoring_v3_servicemonitoringservice_service_delete]
