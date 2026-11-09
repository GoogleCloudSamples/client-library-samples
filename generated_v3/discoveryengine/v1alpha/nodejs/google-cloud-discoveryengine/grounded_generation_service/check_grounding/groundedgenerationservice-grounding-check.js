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

// [START discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
'use strict';

const {GroundedGenerationServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new GroundedGenerationServiceClient();

/**
 * Use the checkGrounding method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function checkGrounding(projectId) {
  try {
    const groundingConfig = 'example-grounding-config';
    const location = 'global';
    const groundingConfigPath = `projects/${projectId}/locations/${location}/groundingConfigs/${groundingConfig}`;

    const request = {
      groundingConfig: groundingConfigPath,
      answerCandidate: 'Discovery Engine provides generative AI search capabilities.',
      facts: [
        {
          id: 'example-fact-1',
          factText: 'Discovery Engine offers enterprise search and grounding features powered by generative AI.',
        },
      ],
    };

    const [response] = await client.checkGrounding(request);

    console.log(`Support score: ${response.supportScore}`);
    console.log(`Claims evaluated: ${response.claims ? response.claims.length : 0}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message || err}`);
    }
  }
}

module.exports = { checkGrounding };
// [END discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
