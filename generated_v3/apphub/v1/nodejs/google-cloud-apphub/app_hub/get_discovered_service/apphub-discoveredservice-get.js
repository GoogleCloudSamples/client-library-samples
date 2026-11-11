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

// [START apphub_v1_apphub_discoveredservice_get]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Use the getDiscoveredService method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} discoveredServiceId - ID of the DiscoveredService (for example, 'example-discoveredservice-id')
 */
async function getDiscoveredService(projectId, locationId, discoveredServiceId) {
  try {
    const name = client.discoveredServicePath(projectId, locationId, discoveredServiceId);
    const request = {
      name,
    };

    const [response] = await client.getDiscoveredService(request);
    console.log(`Discovered service retrieved: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Discovered service '${discoveredServiceId}' was not found in location '${locationId}'.`);
    } else {
      console.error('Failed to retrieve discovered service:', err);
    }
  }
}

module.exports = { getDiscoveredService };
// [END apphub_v1_apphub_discoveredservice_get]
