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

// [START networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]
'use strict';

const {TransportManagerClient} = require('@google-cloud/network-connectivity').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new TransportManagerClient();

/**
 * Lists remote transport profiles for a specific project and location.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location (region) to list remote transport profiles from.
 */
async function listRemoteTransportProfiles(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [profiles] = await client.listRemoteTransportProfiles(request);
    console.log(`Listing remote transport profiles for ${parent}:`);
    if (profiles.length === 0) {
      console.log('No remote transport profiles found.');
      return;
    }

    for (const profile of profiles) {
      console.log(`Remote transport profile: ${profile.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listRemoteTransportProfiles };
// [END networkconnectivity_v1beta_transportmanager_remotetransportprofiles_list]
