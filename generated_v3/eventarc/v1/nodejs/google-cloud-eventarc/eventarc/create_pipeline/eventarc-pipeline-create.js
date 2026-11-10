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

// [START eventarc_v1_eventarc_pipeline_create]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Creates an Eventarc pipeline.
 *
 * @param {string} pipelineId - The user-provided ID to be assigned to the pipeline (for example, 'example-pipeline').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID (for example, 'us-central1').
 */
async function createPipeline(pipelineId, projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const pipeline = {
      destinations: [
        {
          httpEndpoint: {
            uri: 'https://example.com',
          },
        },
      ],
    };

    const [operation] = await client.createPipeline({
      parent,
      pipeline,
      pipelineId,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Created pipeline: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Pipeline already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create pipeline: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createPipeline };
// [END eventarc_v1_eventarc_pipeline_create]
