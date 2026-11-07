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

// [START dlp_v2_dlpservice_activate_job_trigger]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Activates a Cloud DLP job trigger.
 *
 * @param {string} projectId - Google Cloud project ID that owns the job trigger.
 * @param {string} jobTriggerId - Identifier of the JobTrigger to activate.
 */
async function activateJobTrigger(projectId, jobTriggerId) {
  const name = `projects/${projectId}/jobTriggers/${jobTriggerId}`;

  try {
    const request = {
      name,
    };

    const [dlpJob] = await client.activateJobTrigger(request);
    console.log(`Job trigger activated. Resulting job name: ${dlpJob.name}`);
    console.log(`Job state: ${dlpJob.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for ${name}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request arguments: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing ${name}: ${err.message}`);
    } else {
      console.error(`Failed to activate job trigger: ${err.message}`);
    }
  }
}

module.exports = { activateJobTrigger };
// [END dlp_v2_dlpservice_activate_job_trigger]
