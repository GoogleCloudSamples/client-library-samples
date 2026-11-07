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

// [START datastream_v1_datastream_connectionprofile_update]
'use strict';

const {DatastreamClient} = require('@google-cloud/datastream');
const {status} = require('@grpc/grpc-js');

const client = new DatastreamClient();

/**
 * Updates a Datastream connection profile.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, us-central1).
 * @param {string} connectionProfileId - The identifier of the connection profile to update.
 */
async function updateConnectionProfile(projectId, locationId, connectionProfileId) {
  const connectionProfile = {
    name: `projects/${projectId}/locations/${locationId}/connectionProfiles/${connectionProfileId}`,
    displayName: 'Updated Connection Profile',
  };
  const updateMask = {
    paths: ['display_name'],
  };

  const maxAttempts = 15;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const [operation] = await client.updateConnectionProfile({
        connectionProfile,
        updateMask,
      });

      const [response] = await operation.promise();
      console.log(`Updated connection profile: ${response.name}`);
      return;
    } catch (err) {
      if (err.code === status.ABORTED && attempt < maxAttempts) {
        // Wait for pending resource operations to complete before retrying.
        await new Promise((resolve) => setTimeout(resolve, 5000));
        continue;
      }

      if (err.code === status.NOT_FOUND) {
        console.error(`Connection profile not found: ${err.message}`);
      } else if (err.code === status.INVALID_ARGUMENT) {
        console.error(`Invalid argument provided: ${err.message}`);
      } else if (err.code === status.PERMISSION_DENIED) {
        console.error(`Permission denied: ${err.message}`);
      } else if (err.code === status.ABORTED) {
        console.error(`Operation aborted: ${err.message}`);
      } else {
        console.error(`Operation failed: ${err.message}`);
      }
      break;
    }
  }
}

module.exports = { updateConnectionProfile };
// [END datastream_v1_datastream_connectionprofile_update]
