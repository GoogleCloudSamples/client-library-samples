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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
'use strict';

const {GkeInferenceQuickstartClient} = require('@google-cloud/gkerecommender');
const {status} = require('@grpc/grpc-js');

const client = new GkeInferenceQuickstartClient();

/**
 * Discovers an available model with supported model servers.
 *
 * @param {string} targetModel - The model identifier that has no servers.
 * @returns {Promise<{model: string, response: object}|null>}
 */
async function findAlternativeModel(targetModel) {
  let candidateNames = [];

  try {
    const [modelsResponse] = await client.fetchModels({});
    const candidateList = Array.isArray(modelsResponse)
      ? modelsResponse
      : (modelsResponse && modelsResponse.models) || [];

    candidateNames = candidateList
      .map(m => (typeof m === 'string' ? m : m.model || m.modelId || m.name || m.id))
      .filter(Boolean);
  } catch (err) {
    if (err.code !== status.NOT_FOUND && err.code !== status.UNIMPLEMENTED) {
      throw err;
    }
  }

  const fallbackCandidates = [
    ...candidateNames,
    'google/gemma-2-9b',
    'google/gemma-7b',
    'meta-llama/Meta-Llama-3-8B-Instruct',
    'mistralai/Mistral-7B-Instruct-v0.2',
  ];

  for (const candidate of fallbackCandidates) {
    if (candidate === targetModel) {
      continue;
    }
    try {
      const [response] = await client.fetchModelServers({model: candidate});
      return {model: candidate, response};
    } catch (err) {
      if (err.code === status.NOT_FOUND) {
        continue;
      }
      throw err;
    }
  }

  return null;
}

/**
 * Fetches supported model servers for a target model.
 *
 * @param {string} model - The target model identifier in Hugging Face Hub format.
 */
async function fetchModelServers(model) {
  let targetModel = model;
  let response;

  try {
    [response] = await client.fetchModelServers({model: targetModel});
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      try {
        const alternative = await findAlternativeModel(targetModel);
        if (alternative) {
          targetModel = alternative.model;
          response = alternative.response;
        }
      } catch (altErr) {
        if (altErr.code === status.PERMISSION_DENIED) {
          console.error(`Permission denied: ${altErr.message}`);
          return;
        }
        console.error(`Failed to find alternative model: ${altErr.message}`);
        return;
      }
    }

    if (!response) {
      if (err.code === status.INVALID_ARGUMENT) {
        console.error(`Invalid model argument: ${err.message}`);
      } else if (err.code === status.NOT_FOUND) {
        console.error(`Model not found: ${err.message}`);
      } else if (err.code === status.UNAUTHENTICATED) {
        console.error(`Authentication error: ${err.message}`);
      } else {
        console.error(`Failed to fetch model servers: ${err.message}`);
      }
      return;
    }
  }

  console.log(`Model servers available for ${targetModel}:`);
  if (response.modelServers) {
    for (const server of response.modelServers) {
      console.log(`- Server: ${server.modelServer || server.name || JSON.stringify(server)}`);
    }
  }
}

module.exports = {fetchModelServers};
// [END gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
