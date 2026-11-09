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

// [START networkservices_v1_networkservices_httproute_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Retrieves the specified HttpRoute resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or 'global' where the HttpRoute is located.
 * @param {string} httpRouteId - The caller-specified identifier of the existing HttpRoute to retrieve.
 */
async function getHttpRoute(projectId, locationId, httpRouteId) {
  const name = `projects/${projectId}/locations/${locationId}/httpRoutes/${httpRouteId}`;

  try {
    const request = {
      name,
    };

    const [response] = await client.getHttpRoute(request);
    console.log(`Retrieved HttpRoute: ${response.name}`);
    console.log(`Hostnames: ${JSON.stringify(response.hostnames)}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`HttpRoute not found at ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing ${name}`);
    } else {
      console.error(`Failed to retrieve HttpRoute: ${err.message}`);
    }
  }
}

module.exports = { getHttpRoute };
// [END networkservices_v1_networkservices_httproute_get]
