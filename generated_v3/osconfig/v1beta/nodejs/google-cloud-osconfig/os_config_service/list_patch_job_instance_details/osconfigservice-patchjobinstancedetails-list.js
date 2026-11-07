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

// [START osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]
'use strict';

const {OsConfigServiceClient} = require('@google-cloud/os-config');
const {status} = require('@grpc/grpc-js');

const client = new OsConfigServiceClient();

/**
 * Lists details for instances in a patch job.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} patchJobId - The patch job ID (for example, 'example-patchjob-id').
 */
async function listPatchJobInstanceDetails(projectId, patchJobId) {
  try {
    const parent = client.patchJobPath(projectId, patchJobId);
    const request = {
      parent: parent,
    };

    const [instanceDetails] = await client.listPatchJobInstanceDetails(request);

    if (!instanceDetails || instanceDetails.length === 0) {
      console.log('No instance details found.');
      return;
    }

    for (const instanceDetail of instanceDetails) {
      console.log(`Instance name: ${instanceDetail.name}`);
      console.log(`State: ${instanceDetail.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Patch job resource not found.');
    } else {
      console.error('Failed to list patch job instance details:', err);
    }
  }
}

module.exports = { listPatchJobInstanceDetails };
// [END osconfig_v1beta_osconfigservice_patchjobinstancedetails_list]
