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

// [START datastream_v1alpha1_datastream_connectionprofile_get]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Use the getConnectionProfile method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the connection profile is located.
 * @param {string} connectionProfileId - The caller-chosen ID of the connection profile to retrieve.
 */
async function getConnectionProfile(projectId, locationId, connectionProfileId) {
  try {
    // Construct the fully-qualified connection profile resource path.
    const name = `projects/${projectId}/locations/${locationId}/connectionProfiles/${connectionProfileId}`;

    const [connectionProfile] = await client.getConnectionProfile({
      name,
    });

    console.log(`Connection profile name: ${connectionProfile.name}`);
    console.log(`Display name: ${connectionProfile.displayName}`);
    console.log(`State: ${connectionProfile.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Connection profile not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing connection profile: ${err.message}`);
    } else {
      console.error(`Failed to retrieve connection profile: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { getConnectionProfile };
// [END datastream_v1alpha1_datastream_connectionprofile_get]
