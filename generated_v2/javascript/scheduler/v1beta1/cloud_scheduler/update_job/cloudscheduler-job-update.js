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

// [START cloudscheduler_v1beta1_cloudscheduler_job_update]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Use the updateJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID where the Cloud Scheduler job resides (for example, 'us-central1').
 * @param {string} jobId - The ID of the Cloud Scheduler job to update.
 */
async function updateJob(projectId, locationId, jobId) {
  try {
    const job = {
      name: client.jobPath(projectId, locationId, jobId),
      description: 'Updated Cloud Scheduler job description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [response] = await client.updateJob({
      job,
      updateMask,
    });

    console.log(`Updated job: ${response.name}`);
    console.log(`Updated description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error updating job: ${err.message}`);
    }
  }
}

module.exports = { updateJob };
// [END cloudscheduler_v1beta1_cloudscheduler_job_update]
