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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_models]
'use strict';

const {GkeInferenceQuickstartClient} = require('@google-cloud/gkerecommender');
const {status} = require('@grpc/grpc-js');

const client = new GkeInferenceQuickstartClient();

/**
 * Fetches available models supported by the GKE inference quickstart service.
 */
async function fetchModels() {
  try {
    const pageSize = 50;

    const request = {
      pageSize,
    };

    const [models] = await client.fetchModels(request);
    for (const model of models) {
      console.log(`Model: ${model.name}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { fetchModels };
// [END gkerecommender_v1_gkeinferencequickstart_fetch_models]
