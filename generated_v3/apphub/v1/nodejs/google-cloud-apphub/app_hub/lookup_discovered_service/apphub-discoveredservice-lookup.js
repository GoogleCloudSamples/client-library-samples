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

// [START apphub_v1_apphub_lookup_discovered_service]
'use strict';

const {AppHubClient} = require('@google-cloud/apphub');
const {status} = require('@grpc/grpc-js');

const client = new AppHubClient();

/**
 * Look up a discovered service by resource URI.
 *
 * @param {string} projectId - The Google Cloud host project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'us-central1' or 'global') where the Discovered Service is located.
 * @param {string} uri - The resource URI to find the Discovered Service for (accepts project ID or project number).
 */
async function lookupDiscoveredService(projectId, locationId, uri) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
      uri,
    };

    const [response] = await client.lookupDiscoveredService(request);

    console.log(`Discovered Service name: ${response.discoveredService?.name}`);
    return response.discoveredService;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Discovered service not found for URI ${uri}: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing App Hub: ${err.message}`);
    } else {
      console.error(`Error looking up discovered service: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { lookupDiscoveredService };
// [END apphub_v1_apphub_lookup_discovered_service]
