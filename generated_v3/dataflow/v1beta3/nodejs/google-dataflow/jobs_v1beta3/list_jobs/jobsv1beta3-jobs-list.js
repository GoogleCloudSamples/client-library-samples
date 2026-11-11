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

// [START dataflow_v1beta3_jobsv1beta3_jobs_list]
'use strict';

const {JobsV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new JobsV1Beta3Client();

/**
 * Lists Dataflow jobs in a project and location.
 */
async function listJobs() {
  const projectId =
    process.env.GOOGLE_CLOUD_PROJECT || (await client.getProjectId());
  const location = process.env.GOOGLE_CLOUD_REGION || 'us-central1';

  const request = {
    projectId,
    location,
  };

  try {
    const [jobs] = await client.listJobs(request);
    console.log(`Retrieved ${jobs.length} jobs.`);
    for (const job of jobs) {
      console.log(`Job ID: ${job.id}, Name: ${job.name}, State: ${job.currentState}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API call failed: ${err.message}`);
    }
  }
}

module.exports = { listJobs };
// [END dataflow_v1beta3_jobsv1beta3_jobs_list]
