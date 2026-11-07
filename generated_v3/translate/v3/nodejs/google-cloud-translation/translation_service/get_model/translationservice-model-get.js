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

// [START translate_v3_translationservice_model_get]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Retrieves a translation model.
 */
async function getModel() {
  try {
    const projectId =
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.PROJECT_ID ||
      (await client.getProjectId());
    const location = process.env.LOCATION_ID || 'us-central1';
    const modelId = process.env.MODEL_ID || 'example-model-id';
    const name =
      process.env.MODEL_NAME || client.modelPath(projectId, location, modelId);

    const request = {
      name,
    };

    const [model] = await client.getModel(request);

    console.log(`Model name: ${model.name}`);
    console.log(`Display name: ${model.displayName}`);
    console.log(`Source language: ${model.sourceLanguageCode}`);
    console.log(`Target language: ${model.targetLanguageCode}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Model not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google Cloud API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { getModel };
// [END translate_v3_translationservice_model_get]
