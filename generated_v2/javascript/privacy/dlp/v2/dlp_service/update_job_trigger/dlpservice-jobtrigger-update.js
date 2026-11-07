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

// [START dlp_v2_dlpservice_jobtrigger_update]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the updateJobTrigger method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the job trigger.
 * @param {string} jobTriggerId - The identifier of the job trigger to update. Can be user-specified or server-generated at creation time; obtain from an existing JobTrigger resource or a ListJobTriggers response.
 */
async function updateJobTrigger(projectId, jobTriggerId) {
  try {
    // Construct the resource identifier for the target job trigger.
    const name = `projects/${projectId}/jobTriggers/${jobTriggerId}`;

    // Define the updated job trigger configuration.
    const jobTrigger = {
      description: 'Updated job trigger description',
    };

    // Specify the fields to update to prevent overriding unspecified properties.
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      name,
      jobTrigger,
      updateMask,
    };

    const [response] = await client.updateJobTrigger(request);

    console.log(`Updated job trigger: ${response.name}`);
    console.log(`Updated description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job trigger not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to update job trigger: ${err.message}`);
    }
  }
}

module.exports = { updateJobTrigger };
// [END dlp_v2_dlpservice_jobtrigger_update]
