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

// [START bigtable_v2_bigtableinstanceadmin_appprofiles_list]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Lists Cloud Bigtable application profiles in a specified instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the Cloud Bigtable instance (for example, 'example-instance-id'), or '-' to list application profiles across all instances.
 */
async function listAppProfiles(projectId, instanceId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const request = {
      parent,
    };

    const [appProfiles] = await client.listAppProfiles(request);
    console.log(`Retrieved ${appProfiles.length} app profile(s):`);
    for (const appProfile of appProfiles) {
      console.log(`- Name: ${appProfile.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listAppProfiles};
// [END bigtable_v2_bigtableinstanceadmin_appprofiles_list]
