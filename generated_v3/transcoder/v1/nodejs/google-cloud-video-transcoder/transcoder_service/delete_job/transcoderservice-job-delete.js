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

// [START transcoder_v1_transcoderservice_job_delete]
'use strict';

const {TranscoderServiceClient} = require('@google-cloud/video-transcoder');
const {status} = require('@grpc/grpc-js');

const client = new TranscoderServiceClient();

/**
 * Use the deleteJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - The server-generated ID of the transcoding job to delete. Obtain this ID from the response of a CreateJob or ListJobs call.
 */
async function deleteJob(projectId, locationId, jobId) {
  const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;

  try {
    const request = {
      name,
    };

    await client.deleteJob(request);
    console.log(`Deleted job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Transcoding job not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete transcoding job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteJob };
// [END transcoder_v1_transcoderservice_job_delete]
