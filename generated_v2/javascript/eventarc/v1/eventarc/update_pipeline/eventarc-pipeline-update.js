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

// [START eventarc_v1_eventarc_pipeline_update]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Use the updatePipeline method
 *
 * @param {string} projectId - The Google Cloud project ID where the pipeline is deployed.
 * @param {string} locationId - The Google Cloud region where the pipeline is deployed.
 * @param {string} pipelineId - The user-provided ID or name of the existing Pipeline to update.
 */
async function updatePipeline(projectId, locationId, pipelineId) {
  try {
    const pipeline = {
      name: `projects/${projectId}/locations/${locationId}/pipelines/${pipelineId}`,
      displayName: 'Updated Pipeline Display Name',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updatePipeline({
      pipeline,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();
    console.log(`Updated pipeline: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Pipeline not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updatePipeline };
// [END eventarc_v1_eventarc_pipeline_update]
