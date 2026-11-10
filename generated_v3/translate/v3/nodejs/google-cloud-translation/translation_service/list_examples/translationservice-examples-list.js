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

// [START translate_v3_translationservice_examples_list]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Lists translation examples in a dataset.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the dataset is located (for example, 'us-central1').
 * @param {string} datasetId - The ID of the dataset to list examples from.
 */
async function listExamples(projectId, locationId, datasetId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/datasets/${datasetId}`;
    const request = {
      parent,
    };

    const [examples] = await client.listExamples(request);

    if (examples.length === 0) {
      console.log('No examples found in the dataset.');
      return;
    }

    console.log(`Found ${examples.length} example(s):`);
    for (const example of examples) {
      console.log(`Name: ${example.name}`);
      console.log(`Source text: ${example.sourceText}`);
      console.log(`Target text: ${example.targetText}`);
      console.log(`Usage: ${example.usage}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Dataset not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listExamples };
// [END translate_v3_translationservice_examples_list]
