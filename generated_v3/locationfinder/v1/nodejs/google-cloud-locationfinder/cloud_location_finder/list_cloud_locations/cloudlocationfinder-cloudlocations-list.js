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

// [START locationfinder_v1_cloudlocationfinder_cloudlocations_list]
'use strict';

const {CloudLocationFinderClient} = require('@google-cloud/locationfinder');
const {status} = require('@grpc/grpc-js');

const client = new CloudLocationFinderClient();

/**
 * Use the listCloudLocations method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 */
async function listCloudLocations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [cloudLocations] = await client.listCloudLocations(request);
    for (const cloudLocation of cloudLocations) {
      console.log(`Cloud location: ${cloudLocation.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication error: ${err.message}`);
    } else {
      console.error(`API error (status ${err.code}): ${err.message}`);
    }
  }
}

module.exports = { listCloudLocations };
// [END locationfinder_v1_cloudlocationfinder_cloudlocations_list]
