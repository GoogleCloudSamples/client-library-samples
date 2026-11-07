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

// [START dlp_v2_dlpservice_dlpjob_delete]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the deleteDlpJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} dlpJobId - The identifier of the DLP job to delete.
 */
async function deleteDlpJob(projectId, dlpJobId) {
  const name = `projects/${projectId}/dlpJobs/${dlpJobId}`;

  const request = {
    name,
  };

  try {
    await client.deleteDlpJob(request);
    console.log(`Deleted DLP job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DLP job not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting DLP job: ${name}`);
    } else {
      console.error(`API error deleting DLP job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteDlpJob };
// [END dlp_v2_dlpservice_dlpjob_delete]
