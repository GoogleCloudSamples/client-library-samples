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

// [START networkconnectivity_v1beta_transportmanager_transports_list]
'use strict';

const {TransportManagerClient} = require('@google-cloud/network-connectivity').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new TransportManagerClient();

/**
 * Lists transports in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region.
 */
async function listTransports(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const [transports] = await client.listTransports({
      parent,
    });

    for (const transport of transports) {
      console.log(`Transport: ${transport.name}`);
    }
    console.log(`Total transports: ${transports.length}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listTransports};
// [END networkconnectivity_v1beta_transportmanager_transports_list]
