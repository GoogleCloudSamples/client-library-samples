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

// [START dlp_v2_dlpservice_hybrid_inspect_dlp_job]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the hybridInspectDlpJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the DLP job (for example, 'global' or 'us-central1').
 * @param {string} dlpJobId - The server-generated or caller-specified ID of the running hybrid DLP job.
 */
async function hybridInspectDlpJob(projectId, locationId, dlpJobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dlpJobs/${dlpJobId}`;
    const hybridItem = {
      item: {
        value: 'My email is user@example.com and phone is 555-0123',
      },
    };

    const request = {
      name,
      hybridItem,
    };

    await client.hybridInspectDlpJob(request);
    console.log(`Hybrid inspection request processed for job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`DLP job not found: ${err.message}`);
      return;
    }
    if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Job not in active state: ${err.message}`);
      return;
    }
    console.error(`Google API error [code ${err.code}]: ${err.message}`);
  }
}

module.exports = { hybridInspectDlpJob };
// [END dlp_v2_dlpservice_hybrid_inspect_dlp_job]
