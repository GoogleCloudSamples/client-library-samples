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

// [START dlp_v2_dlpservice_jobtriggers_list]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists Sensitive Data Protection job triggers for a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listJobTriggers(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const request = {
      parent,
    };

    const [jobTriggers] = await client.listJobTriggers(request);

    console.log(`Retrieved ${jobTriggers.length} job trigger(s).`);
    for (const trigger of jobTriggers) {
      console.log(`Trigger name: ${trigger.name}`);
      console.log(`Display name: ${trigger.displayName}`);
      console.log(`Status: ${trigger.status}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while listing job triggers: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listJobTriggers };
// [END dlp_v2_dlpservice_jobtriggers_list]
