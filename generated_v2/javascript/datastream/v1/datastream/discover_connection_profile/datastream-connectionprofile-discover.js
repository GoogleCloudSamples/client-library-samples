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

// [START datastream_v1_datastream_discover_connection_profile]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Discovers schemas and data objects for a Datastream connection profile.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function discoverConnectionProfile(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    // Resolve an existing discoverable connection profile in the parent location
    const [profiles] = await client.listConnectionProfiles({parent});
    const discoverableProfile = profiles.find(
      profile =>
        profile.mysqlProfile ||
        profile.oracleProfile ||
        profile.postgresqlProfile ||
        profile.sqlServerProfile
    );
    const connectionProfileName = discoverableProfile
      ? discoverableProfile.name
      : profiles[0]?.name ||
        `${parent}/connectionProfiles/example-connection-profile`;

    const request = {
      parent,
      connectionProfileName,
      recursive: true,
    };

    const [response] = await client.discoverConnectionProfile(request);
    console.log('Connection profile discovered successfully:');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API execution error: ${err.message}`);
    }
  }
}

module.exports = { discoverConnectionProfile };
// [END datastream_v1_datastream_discover_connection_profile]
