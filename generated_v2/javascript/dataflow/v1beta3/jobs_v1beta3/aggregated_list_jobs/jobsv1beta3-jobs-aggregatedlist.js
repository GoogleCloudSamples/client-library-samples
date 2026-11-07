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

// [START dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]
'use strict';

const {JobsV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new JobsV1Beta3Client();

/**
 * Use the aggregatedListJobs method
 *
 * @param {string} projectId - The ID of the Google Cloud project that owns the Dataflow jobs.
 */
async function aggregatedListJobs(projectId) {
  try {
    const request = {
      projectId,
    };

    // Retrieve Dataflow jobs across all regions for the specified project
    const [jobs] = await client.aggregatedListJobs(request);

    for (const job of jobs) {
      console.log(`Job ID: ${job.id}`);
      console.log(`Name: ${job.name}`);
      console.log(`Type: ${job.type}`);
      console.log(`Current State: ${job.currentState}`);
      console.log(`Location: ${job.location}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found for project: ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project: ${projectId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`RPC failed: ${err.message}`);
    }
  }
}

module.exports = { aggregatedListJobs };
// [END dataflow_v1beta3_jobsv1beta3_aggregated_list_jobs]
