// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process');

// [START translate_v3_translationservice_dataset_get_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Gets the specified dataset.
 *
 * Dataset identifiers are automatically assigned, alphanumeric strings.
 * You can look up your dataset identifier by using listDataset.
 *
 * A dataset is a collection of parallel sentence pairs used to train and evaluate
 * custom translation models.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'cloud-samples-data')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} datasetId The ID of the dataset to retrieve. (e.g., '123abc456')
 */
async function getDataset(projectId, location = 'us-central1', datasetId) {
  // Construct the full resource name for the dataset.
  const name = client.datasetPath(projectId, location, datasetId);

  const request = {
    name,
  };

  try {
    const [dataset] = await client.getDataset(request);

    console.log(`Dataset name: ${dataset.name}`);
    console.log(`Display Name: ${dataset.displayName}`);
    console.log(`Source Language Code: ${dataset.sourceLanguageCode}`);
    console.log(`Target Language Code: ${dataset.targetLanguageCode}`);
    console.log(`Example Count: ${dataset.exampleCount}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Dataset '${datasetId}' not found in location '${location}' of project '${projectId}'.`,
      );
      console.error(
        'Please ensure the dataset ID and project/location are correct.',
      );
    } else {
      console.error(`Error getting dataset '${datasetId}':`, err);
    }
  }
}
// [END translate_v3_translationservice_dataset_get_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const datasetId = args[2];
  await getDataset(projectId, location, datasetId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (e.g., 'my-project-id')
 - Google Cloud Location (e.g., 'us-central1')
 - Dataset ID (e.g., 'my-custom-dataset')

Usage:

 node ${process.argv[1]} my-project-id us-central1 my-custom-dataset
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getDataset,
};
