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

// [START run_v2_services_service_get]
'use strict';

const {ServicesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Use the getService method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serviceId - ID of the Service (for example, 'example-service-id')
 */
async function getService(projectId, locationId, serviceId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/services/${serviceId}`;

    const request = {
      name,
    };

    const [response] = await client.getService(request);
    console.log(`Service Name: ${response.name}`);
    console.log(`Service URI: ${response.uri}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Service not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Google API error: ${err.message}`);
    }
  }
}

module.exports = { getService };
// [END run_v2_services_service_get]
