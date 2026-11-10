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

// [START eventarc_v1_eventarc_pipeline_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the getPipeline method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the pipeline (for example, 'us-central1').
 * @param {string} pipelineId - The ID of the Eventarc pipeline to retrieve. Must match ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$.
 */
async function getPipeline(projectId, locationId, pipelineId) {
  try {
    const name = client.pipelinePath(projectId, locationId, pipelineId);

    const [pipeline] = await client.getPipeline({name});

    console.log(`Pipeline name: ${pipeline.name}`);
    console.log(`Pipeline state: ${pipeline.state || 'STATE_UNSPECIFIED'}`);
    return pipeline;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Pipeline not found at ${projectId}/${locationId}/${pipelineId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when retrieving pipeline ${pipelineId}`);
    } else {
      console.error(`API error retrieving pipeline: ${err.message}`);
    }
  }
}

module.exports = { getPipeline };
// [END eventarc_v1_eventarc_pipeline_get]
