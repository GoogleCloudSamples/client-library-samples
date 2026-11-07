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

// [START apphub_v1_apphub_discoveredservices_list]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Lists discovered services in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listDiscoveredServices(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const [discoveredServices] = await client.listDiscoveredServices({
      parent,
    });

    for (const service of discoveredServices) {
      console.log(`Discovered service: ${service.name}`);
      if (service.serviceReference) {
        console.log(`Service URI: ${service.serviceReference.uri}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listDiscoveredServices };
// [END apphub_v1_apphub_discoveredservices_list]
