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

// [START bigtable_v2_bigtableinstanceadmin_appprofile_create]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

const {BigtableInstanceAdminClient} = v2;

/**
 * Creates an app profile in a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the existing Cloud Bigtable instance.
 * @param {string} appProfileId - The ID to assign to the new app profile.
 */
async function createAppProfile(projectId, instanceId, appProfileId) {
  const client = new BigtableInstanceAdminClient();

  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const appProfile = {
      description: 'Routing policy for multi-cluster instances',
      multiClusterRoutingUseAny: {},
    };

    const request = {
      parent,
      appProfileId,
      appProfile,
    };

    const [response] = await client.createAppProfile(request);
    console.log(`Created app profile: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`App profile already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Instance or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error creating app profile: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createAppProfile };
// [END bigtable_v2_bigtableinstanceadmin_appprofile_create]
