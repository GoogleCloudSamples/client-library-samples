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

// [START locationfinder_v1_cloudlocationfinder_cloudlocation_get]
'use strict';

const {CloudLocationFinderClient} = require('@google-cloud/locationfinder');
const {status} = require('@grpc/grpc-js');

const client = new CloudLocationFinderClient();

/**
 * Retrieves details of a specific cloud location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} cloudLocationId - The identifier of the cloud location to retrieve, obtained from ListCloudLocations.
 */
async function getCloudLocation(projectId, locationId, cloudLocationId) {
  try {
    let name = `projects/${projectId}/locations/${locationId}/cloudLocations/${cloudLocationId}`;
    if (
      !cloudLocationId.startsWith('gcp-') &&
      !cloudLocationId.startsWith('aws-') &&
      !cloudLocationId.startsWith('azure-')
    ) {
      name = `projects/${projectId}/locations/${locationId}/cloudLocations/gcp-${cloudLocationId}`;
    }

    const request = {
      name,
    };

    const [response] = await client.getCloudLocation(request);

    console.log(`Resource Name: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`Cloud Provider: ${response.cloudProvider}`);
    console.log(`Location Type: ${response.cloudLocationType}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Cloud location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied while accessing cloud location: ${err.message}`
      );
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getCloudLocation };
// [END locationfinder_v1_cloudlocationfinder_cloudlocation_get]
