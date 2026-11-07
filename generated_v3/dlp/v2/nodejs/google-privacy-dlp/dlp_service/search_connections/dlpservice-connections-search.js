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

// [START dlp_v2_dlpservice_connections_search]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Searches connections in a specified Google Cloud project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region, or '-' for all locations.
 */
async function searchConnections(projectId, locationId) {
  try {
    // The SearchConnections RPC requires the wildcard location '-'.
    if (!locationId || locationId !== '-') {
      locationId = '-';
    }
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [connections] = await client.searchConnections(request);

    if (!connections || connections.length === 0) {
      console.log('No connections found.');
      return;
    }

    for (const connection of connections) {
      console.log(`Connection: ${connection.name}`);
      console.log(`State: ${connection.state}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing connections: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { searchConnections };
// [END dlp_v2_dlpservice_connections_search]
