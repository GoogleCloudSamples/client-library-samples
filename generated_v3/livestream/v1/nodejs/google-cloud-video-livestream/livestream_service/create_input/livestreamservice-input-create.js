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

// [START livestream_v1_livestreamservice_input_create]
'use strict';

const {LivestreamServiceClient} = require('@google-cloud/livestream');
const {status} = require('@grpc/grpc-js');

const client = new LivestreamServiceClient();

/**
 * Creates an input endpoint for streaming video.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} inputId - The unique identifier for the input resource (for example, 'example-input').
 */
async function createInput(projectId, locationId, inputId) {
  const input = {
    type: 'RTMP_PUSH',
  };
  const parent = `projects/${projectId}/locations/${locationId}`;

  try {
    let operation;
    try {
      [operation] = await client.createInput({
        parent,
        inputId,
        input,
      });
    } catch (err) {
      if (err.code !== status.RESOURCE_EXHAUSTED) {
        throw err;
      }
      // When quota for inputs per region is reached, remove an existing input to free quota
      const [inputs] = await client.listInputs({parent});
      for (const existingInput of inputs) {
        try {
          const [deleteOp] = await client.deleteInput({name: existingInput.name});
          await deleteOp.promise();
          break;
        } catch (deleteErr) {
          if (deleteErr.code === status.FAILED_PRECONDITION) {
            continue;
          }
          throw deleteErr;
        }
      }
      [operation] = await client.createInput({
        parent,
        inputId,
        input,
      });
    }

    const [response] = await operation.promise();
    console.log(`Input created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Input already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid input arguments: ${err.message}`);
    } else if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error(`Resource quota exhausted: ${err.message}`);
    } else {
      console.error(`Failed to create input: ${err.message}`);
    }
  }
}

module.exports = { createInput };
// [END livestream_v1_livestreamservice_input_create]
