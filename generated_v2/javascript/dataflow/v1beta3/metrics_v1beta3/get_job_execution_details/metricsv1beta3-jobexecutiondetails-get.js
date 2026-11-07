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

// [START dataflow_v1beta3_metricsv1beta3_jobexecutiondetails_get]
'use strict';

const {MetricsV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new MetricsV1Beta3Client();

/**
 * Use the getJobExecutionDetails method
 *
 * @param {string} projectId - The Google Cloud project ID containing the Dataflow job.
 * @param {string} locationId - The regional endpoint/location of the Dataflow job (e.g., 'us-central1').
 * @param {string} jobId - The server-generated ID of the Dataflow job.
 */
async function getJobExecutionDetails(projectId, locationId, jobId) {
  try {
    const request = {
      projectId,
      location: locationId,
      jobId,
    };

    const [response] = await client.getJobExecutionDetails(request);
    console.log(`Execution details retrieved for job: ${jobId}`);

    if (response.stages) {
      for (const stage of response.stages) {
        console.log(`Stage ID: ${stage.stageId}, State: ${stage.state}`);
      }
    }

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dataflow job execution details not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error retrieving job execution details: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getJobExecutionDetails };
// [END dataflow_v1beta3_metricsv1beta3_jobexecutiondetails_get]
