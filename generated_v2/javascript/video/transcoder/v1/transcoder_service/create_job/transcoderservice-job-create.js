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

// [START transcoder_v1_transcoderservice_job_create]
'use strict';

const {TranscoderServiceClient} = require('@google-cloud/video-transcoder');
const {status} = require('@grpc/grpc-js');

const client = new TranscoderServiceClient();

/**
 * Creates a transcoding job using a preset template.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createJob(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const job = {
      inputUri: 'gs://cloud-samples-data/transcoder/for_forest.mp4',
      outputUri: 'gs://example-bucket/outputs/',
      templateId: 'preset/web-hd',
    };

    const request = {
      parent,
      job,
    };

    const [response] = await client.createJob(request);
    console.log(`Job created: ${response.name}`);
    console.log(`Job state: ${response.state}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.details || err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.details || err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.details || err.message}`);
    } else {
      console.error(`Failed to create job: ${err.message}`);
    }
  }
}

module.exports = { createJob };
// [END transcoder_v1_transcoderservice_job_create]
