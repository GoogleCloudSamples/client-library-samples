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

// [START translate_v3_translationservice_dataset_create]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Creates a dataset for AutoML Translation.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1'). Non-global regional location is required for AutoML translation datasets.
 */
async function createDataset(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const dataset = {
      displayName: 'example_dataset',
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
    };

    const request = {
      parent,
      dataset,
    };

    // Initialize the long-running operation to create the dataset
    const [operation] = await client.createDataset(request);

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Dataset created: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Source language: ${response.sourceLanguageCode}`);
    console.log(`Target language: ${response.targetLanguageCode}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Dataset already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Translation API error: ${err.message}`);
      throw err;
    }
  }
}

module.exports = {createDataset};
// [END translate_v3_translationservice_dataset_create]
