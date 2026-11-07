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

// [START bigtable_v2_bigtableinstanceadmin_appprofile_delete]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Deletes an app profile from a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance containing the app profile.
 * @param {string} appProfileId - The ID of the app profile to delete.
 */
async function deleteAppProfile(projectId, instanceId, appProfileId) {
  try {
    const ignoreWarnings = true;
    const name = client.appProfilePath(projectId, instanceId, appProfileId);

    const request = {
      name,
      ignoreWarnings,
    };

    await client.deleteAppProfile(request);
    console.log(`Deleted app profile: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`App profile not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to delete app profile: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteAppProfile };
// [END bigtable_v2_bigtableinstanceadmin_appprofile_delete]
