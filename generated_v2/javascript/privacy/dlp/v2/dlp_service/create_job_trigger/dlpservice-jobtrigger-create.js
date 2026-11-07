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

// [START dlp_v2_dlpservice_jobtrigger_create]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Use the createJobTrigger method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} triggerId - The optional user-specified ID for the job trigger. If omitted or left empty, Cloud DLP will automatically assign a unique identifier. Must match the regex '[a-zA-Z\\d-_]+' with max length 100.
 */
async function createJobTrigger(projectId, triggerId) {
  try {
    const parent = `projects/${projectId}`;

    const inspectConfig = {
      infoTypes: [{name: 'EMAIL_ADDRESS'}, {name: 'PERSON_NAME'}],
      minLikelihood: 'LIKELY',
    };

    const storageConfig = {
      cloudStorageOptions: {
        fileSet: {url: 'gs://example-bucket-name/*'},
      },
    };

    const inspectJob = {
      inspectConfig,
      storageConfig,
    };

    const triggers = [
      {
        schedule: {
          recurrencePeriodDuration: {seconds: 86400},
        },
      },
    ];

    const jobTrigger = {
      status: 'HEALTHY',
      displayName: 'Sample Scheduled Job Trigger',
      triggers,
      inspectJob,
    };

    const request = {
      parent,
      jobTrigger,
    };

    if (triggerId) {
      request.triggerId = triggerId;
    }

    const [response] = await client.createJobTrigger(request);
    console.log(`Created job trigger: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job trigger already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createJobTrigger };
// [END dlp_v2_dlpservice_jobtrigger_create]
