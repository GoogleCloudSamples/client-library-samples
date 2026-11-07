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

// [START translate_v3_translationservice_adaptivemtdataset_create]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Creates an Adaptive MT dataset.
 *
 * @param {string} projectNumberOrId - The Google Cloud project ID or project number (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1')
 */
async function createAdaptiveMtDataset(projectNumberOrId, locationId) {
  try {
    const parent = `projects/${projectNumberOrId}/locations/${locationId}`;
    const adaptiveMtDataset = {
      name: `${parent}/adaptiveMtDatasets/example_dataset`,
      displayName: 'example_dataset',
      sourceLanguageCode: 'en',
      targetLanguageCode: 'es',
    };

    const request = {
      parent,
      adaptiveMtDataset,
    };

    const [response] = await client.createAdaptiveMtDataset(request);

    console.log(`Dataset resource name: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Source language code: ${response.sourceLanguageCode}`);
    console.log(`Target language code: ${response.targetLanguageCode}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Dataset already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err}`);
    }
  }
}

module.exports = {createAdaptiveMtDataset};
// [END translate_v3_translationservice_adaptivemtdataset_create]
