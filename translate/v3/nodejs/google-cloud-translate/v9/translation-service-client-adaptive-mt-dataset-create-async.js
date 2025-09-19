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

// [START translate_v3_translationservice_adaptivemtdataset_create_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Creates an Adaptive MT dataset, which can be used to improve translation
 * quality for specific domains by providing custom training data.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'your-project-id')
 * @param {string} [location='us-central1'] The location of the dataset (e.g., 'us-central1')
 * @param {string} [datasetId='my-adaptive-mt-dataset'] The ID of the Adaptive MT dataset to create (e.g., 'my-custom-dataset')
 */
async function createAdaptiveMtDataset(
  projectId,
  location = 'us-central1',
  datasetId = 'my-adaptive-mt-dataset',
) {
  const parent = `projects/${projectId}/locations/${location}`;

  const adaptiveMtDataset = {
    name: `${parent}/adaptiveMtDatasets/${datasetId}`,
    displayName: `My Adaptive MT Dataset for ${datasetId}`,
    sourceLanguageCode: 'en',
    targetLanguageCode: 'es',
  };

  const request = {
    parent: parent,
    adaptiveMtDataset: adaptiveMtDataset,
  };

  try {
    const [response] = await client.createAdaptiveMtDataset(request);
    console.log(
      `Created Adaptive MT dataset: ${response.name} (Display Name: ${response.displayName})`,
    );
    console.log(
      `Source Language: ${response.sourceLanguageCode}, Target Language: ${response.targetLanguageCode}`,
    );
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Adaptive MT dataset ${datasetId} already exists in location ${location} of project ${projectId}`,
      );
    } else {
      console.error(`Error creating Adaptive MT dataset ${datasetId}:`, err);
    }
  }
}
// [END translate_v3_translationservice_adaptivemtdataset_create_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  await createAdaptiveMtDataset(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (e.g., 'my-project-id')
 - Google Cloud Location (e.g., 'us-central1')
 - Adaptive MT Dataset ID (e.g., 'my-custom-dataset')

Usage:

 node ${process.argv[1]} my-project-id us-central1 my-custom-dataset
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createAdaptiveMtDataset,
};
