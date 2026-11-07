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

// [START dlp_v2_dlpservice_dlpjob_get]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the getDlpJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} dlpJobId - The server-generated identifier of the Cloud DLP job to retrieve.
 */
async function getDlpJob(projectId, dlpJobId) {
  try {
    const name = `projects/${projectId}/dlpJobs/${dlpJobId}`;
    const request = {
      name,
    };

    const [job] = await client.getDlpJob(request);
    console.log(`Job Name: ${job.name}`);
    console.log(`Job State: ${job.state}`);
    console.log(`Job Type: ${job.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { getDlpJob };
// [END dlp_v2_dlpservice_dlpjob_get]
