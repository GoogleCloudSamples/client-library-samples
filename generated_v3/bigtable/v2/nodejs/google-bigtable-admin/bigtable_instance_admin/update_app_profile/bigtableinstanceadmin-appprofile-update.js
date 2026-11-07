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

// [START bigtable_v2_bigtableinstanceadmin_appprofile_update]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Updates an existing Bigtable application profile.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Bigtable instance.
 * @param {string} instanceId - The ID of the Bigtable instance containing the app profile.
 * @param {string} appProfileId - The ID of the Bigtable app profile to update.
 */
async function updateAppProfile(projectId, instanceId, appProfileId) {
  try {
    const appProfile = {
      name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
      description: 'Updated application profile description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateAppProfile({
      appProfile,
      updateMask,
    });

    const [response] = await operation.promise();
    console.log(`Updated app profile: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`App profile or instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateAppProfile };
// [END bigtable_v2_bigtableinstanceadmin_appprofile_update]
