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

// [START monitoring_v3_servicemonitoringservice_service_update]
'use strict';

const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Updates a monitoring service display name using a field mask.
 *
 * @param {string} projectId - The Google Cloud project ID containing the target Service.
 * @param {string} serviceId - The identifier of the Service to update.
 */
async function updateService(projectId, serviceId) {
  try {
    const service = {
      name: `projects/${projectId}/services/${serviceId}`,
      displayName: 'Updated Custom Service',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const request = {
      service,
      updateMask,
    };

    const [response] = await client.updateService(request);
    console.log(`Updated service name: ${response.name}`);
    console.log(`Updated display name: ${response.displayName}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateService };
// [END monitoring_v3_servicemonitoringservice_service_update]
