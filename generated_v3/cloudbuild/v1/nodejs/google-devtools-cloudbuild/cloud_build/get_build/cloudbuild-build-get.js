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

// [START cloudbuild_v1_cloudbuild_build_get]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Use the getBuild method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} buildId - The unique server-generated ID of the build (for example, '4dfb6a70-3d70-4e3a-9be2-4422e11899e3'). Obtain this from the response of a CreateBuild or ListBuilds call.
 */
async function getBuild(projectId, buildId) {
  try {
    const request = {
      projectId,
      id: buildId,
    };

    const [build] = await client.getBuild(request);

    console.log(`Build ID: ${build.id}`);
    console.log(`Status: ${build.status}`);
    console.log(`Log URL: ${build.logUrl}`);
    return build;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Build ${buildId} not found in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing build ${buildId} in project ${projectId}.`);
    } else {
      console.error(`API error retrieving build: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getBuild };
// [END cloudbuild_v1_cloudbuild_build_get]
