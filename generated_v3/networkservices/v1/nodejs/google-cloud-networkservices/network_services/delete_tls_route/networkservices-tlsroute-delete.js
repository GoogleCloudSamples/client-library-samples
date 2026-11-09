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

// [START networkservices_v1_networkservices_tlsroute_delete]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the deleteTlsRoute method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (for example, 'global' or a supported region such as 'us-central1').
 * @param {string} tlsRouteId - The caller-assigned identifier of the TlsRoute to delete.
 */
async function deleteTlsRoute(projectId, locationId, tlsRouteId) {
  const name = `projects/${projectId}/locations/${locationId}/tlsRoutes/${tlsRouteId}`;

  try {
    const [operation] = await client.deleteTlsRoute({
      name,
    });
    await operation.promise();
    console.log(`Deleted TLS route: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TLS route not found: ${name}`);
    } else {
      console.error(`Error deleting TLS route: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTlsRoute };
// [END networkservices_v1_networkservices_tlsroute_delete]
