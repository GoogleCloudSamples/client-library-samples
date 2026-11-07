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

// [START datastream_v1_datastream_connectionprofiles_list]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Lists connection profiles in a specified project and location.
 */
async function listConnectionProfiles() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);

    const request = {
      parent,
    };

    const [connectionProfiles] = await client.listConnectionProfiles(request);

    console.log(`Connection profiles in ${parent}:`);
    for (const profile of connectionProfiles) {
      console.log(`- Name: ${profile.name}`);
      console.log(`  Display Name: ${profile.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list connection profiles: ${err.message}`);
    }
  }
}

module.exports = { listConnectionProfiles };
// [END datastream_v1_datastream_connectionprofiles_list]
