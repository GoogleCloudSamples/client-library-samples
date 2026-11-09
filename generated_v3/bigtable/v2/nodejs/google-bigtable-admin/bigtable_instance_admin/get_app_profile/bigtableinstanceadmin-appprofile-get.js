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

// [START bigtable_v2_bigtableinstanceadmin_appprofile_get]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {BigtableInstanceAdminClient} = v2;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves an app profile from a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 * @param {string} appProfileId - ID of the AppProfile (for example, 'example-appprofile-id')
 */
async function getAppProfile(projectId, instanceId, appProfileId) {
  const client = new BigtableInstanceAdminClient({
    projectId,
    quotaProjectId: projectId,
  });

  try {
    const name = client.appProfilePath(projectId, instanceId, appProfileId);
    const request = {
      name,
    };

    const [appProfile] = await client.getAppProfile(request, {
      otherArgs: {
        headers: {
          'x-goog-user-project': projectId,
        },
      },
    });

    console.log(`Retrieved app profile: ${appProfile.name}`);
    console.log(`Description: ${appProfile.description}`);
    console.log(`Etag: ${appProfile.etag}`);
    return appProfile;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`App profile not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {getAppProfile};
// [END bigtable_v2_bigtableinstanceadmin_appprofile_get]
