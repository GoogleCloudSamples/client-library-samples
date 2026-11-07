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

// [START cloudbuild_v1_cloudbuild_builds_list]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Lists Cloud Build builds in a project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listBuilds(projectId) {
  try {
    const request = {
      projectId,
    };

    const [builds] = await client.listBuilds(request);

    for (const build of builds) {
      console.log(`Build ID: ${build.id}`);
      console.log(`Status: ${build.status}`);
      console.log(`Create Time: ${build.createTime?.seconds}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project ${projectId} not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project ${projectId}.`);
    } else {
      console.error(`Error listing builds: ${err.message}`);
    }
  }
}

module.exports = { listBuilds };
// [END cloudbuild_v1_cloudbuild_builds_list]
