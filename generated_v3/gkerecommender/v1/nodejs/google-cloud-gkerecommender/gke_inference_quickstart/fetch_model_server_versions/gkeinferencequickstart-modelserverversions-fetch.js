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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
'use strict';

const {GkeInferenceQuickstartClient} = require('@google-cloud/gkerecommender');
const {status} = require('@grpc/grpc-js');

const client = new GkeInferenceQuickstartClient();

/**
 * Use the fetchModelServerVersions method
 *
 * @param {string} model - The model for which to list model server versions, formatted as Huggingface Hub owner/model_name (e.g., 'google/gemma-2-2b-it').
 * @param {string} modelServer - The model server for which to list versions, using simplified lowercase names (e.g., 'vllm').
 */
async function fetchModelServerVersions(model, modelServer) {
  try {
    const request = {
      model,
      modelServer,
    };

    const [response] = await client.fetchModelServerVersions(request);

    console.log(`Model server versions for '${modelServer}' with model '${model}':`);
    for (const version of response.modelServerVersions || []) {
      console.log(`- ${version}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (status ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { fetchModelServerVersions };
// [END gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
