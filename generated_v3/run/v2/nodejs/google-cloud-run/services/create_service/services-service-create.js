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

// [START run_v2_services_service_create]
'use strict';

const {ServicesClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Creates a Cloud Run service in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} serviceId - ID of the Service (for example, 'example-service-id')
 */
async function createService(projectId, locationId, serviceId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const service = {
      template: {
        containers: [
          {
            image: 'us-docker.pkg.dev/cloudrun/container/hello',
          },
        ],
      },
    };

    const request = {
      parent,
      service,
      serviceId,
    };

    const [operation] = await client.createService(request);
    const [response] = await operation.promise();

    console.log(`Service created: ${response.name}`);
    console.log(`Service URL: ${response.uri}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Service ${serviceId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
  }
}

module.exports = { createService };
// [END run_v2_services_service_create]
