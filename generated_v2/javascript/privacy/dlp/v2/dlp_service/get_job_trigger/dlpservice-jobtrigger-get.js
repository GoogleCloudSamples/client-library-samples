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

// [START dlp_v2_dlpservice_jobtrigger_get]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Retrieves details of an existing Sensitive Data Protection job trigger.
 *
 * @param {string} projectId - The Google Cloud project ID that owns the job trigger.
 * @param {string} jobTriggerId - The identifier of the DLP job trigger to retrieve.
 */
async function getJobTrigger(projectId, jobTriggerId) {
  try {
    const name = `projects/${projectId}/jobTriggers/${jobTriggerId}`;

    const request = {
      name,
    };

    const [jobTrigger] = await client.getJobTrigger(request);

    console.log(`Job trigger name: ${jobTrigger.name}`);
    console.log(`Display name: ${jobTrigger.displayName}`);
    console.log(`Status: ${jobTrigger.status}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job trigger not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing job trigger: ${err.message}`);
    } else {
      console.error(`Error retrieving job trigger: ${err.message}`);
    }
  }
}

module.exports = { getJobTrigger };
// [END dlp_v2_dlpservice_jobtrigger_get]
