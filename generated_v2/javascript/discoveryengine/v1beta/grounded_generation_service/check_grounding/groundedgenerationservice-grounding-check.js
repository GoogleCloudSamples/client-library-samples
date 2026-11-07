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

// [START discoveryengine_v1beta_groundedgenerationservice_check_grounding]
'use strict';

const {GroundedGenerationServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new GroundedGenerationServiceClient();

/**
 * Use the checkGrounding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID (for example, 'global').
 * @param {string} groundingConfigId - The ID of the grounding config (for example, 'default_grounding_config').
 */
async function checkGrounding(projectId, locationId, groundingConfigId) {
  try {
    const groundingConfig = `projects/${projectId}/locations/${locationId}/groundingConfigs/${groundingConfigId}`;

    const request = {
      groundingConfig,
      answerCandidate: 'Google Cloud Discovery Engine provides enterprise search and generative recommendations.',
      facts: [
        {
          chunkText: 'Google Cloud Discovery Engine offers enterprise search and generative AI features.',
        },
      ],
    };

    const [response] = await client.checkGrounding(request);

    console.log(`Support score: ${response.supportScore}`);
    if (response.citedChunks) {
      console.log(`Cited chunks: ${response.citedChunks.length}`);
    }
    if (response.claims) {
      console.log(`Claims evaluated: ${response.claims.length}`);
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Grounding config not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { checkGrounding };
// [END discoveryengine_v1beta_groundedgenerationservice_check_grounding]
