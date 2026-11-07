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

// [START apihub_v1_apihubdiscovery_discoveredapiobservation_get]
'use strict';

const {ApiHubDiscoveryClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new ApiHubDiscoveryClient();

/**
 * Retrieves a discovered API observation from API Hub.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the API Hub instance is located.
 * @param {string} discoveredApiObservationId - The server-generated ID of the DiscoveredApiObservation to retrieve.
 */
async function getDiscoveredApiObservation(projectId, locationId, discoveredApiObservationId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/discoveredApiObservations/${discoveredApiObservationId}`;
    const request = {
      name,
    };

    const [response] = await client.getDiscoveredApiObservation(request);
    console.log(`Discovered API observation: ${response.name}`);
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(`API Hub instance is not active: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.log(`Discovered API observation not found: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {getDiscoveredApiObservation};
// [END apihub_v1_apihubdiscovery_discoveredapiobservation_get]
