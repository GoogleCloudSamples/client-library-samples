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

// [START translate_v3_translationservice_dataset_create_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Create a dataset for custom translation models.
 *
 * Dataset identifiers are automatically assigned, alphanumeric strings.
 * The display name offers a human-readable way to recognize your dataset,
 * The display name is not guaranteed unique.
 *
 * A dataset is a collection of parallel sentence pairs that are used to train
 * and evaluate custom translation models.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} datasetDisplayName The display name of the dataset (e.g., 'my-custom-dataset')
 */
async function createDataset(
  projectId,
  location = 'us-central1',
  datasetDisplayName = 'my-custom-dataset',
) {
  const datasetRequest = {
    displayName: datasetDisplayName,
    sourceLanguageCode: 'en',
    targetLanguageCode: 'es',
  };

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    dataset: datasetRequest,
  };

  try {
    // Create Dataset using a long-running operation.
    const [operation] = await client.createDataset(request);
    const [dataset] = await operation.promise();
    console.log(`Created Dataset: ${dataset.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Dataset '${datasetDisplayName}' already exists in location '${location}' of project '${projectId}'.`,
      );
      console.log(
        'You can use the existing dataset or choose a different display name.',
      );
    } else {
      console.error(`Error creating dataset '${datasetDisplayName}':`, err);
      // For other errors, re-throw or handle as appropriate for your application.
      // For this sample, we'll just log it.
    }
  }
}
// [END translate_v3_translationservice_dataset_create_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const datasetDisplayName = args[2];

  await createDataset(projectId, location, datasetDisplayName);
}

if (require.main === module) {
  process.on('unhandledException', (err) => {
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
  createDataset,
};
