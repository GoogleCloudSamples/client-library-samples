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

// Imports for command-line runner
const process = require('process');

// [START translate_v3_translationservice_adaptivemtdataset_get_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

// Instantiates a client
const client = new TranslationServiceClient();

/**
 * Gets an Adaptive MT dataset.
 *
 * An Adaptive MT dataset is a collection of parallel sentences that can be used
 * to customize machine translation models.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} datasetId The ID of the Adaptive MT dataset to retrieve (e.g., 'my-adaptive-mt-dataset')
 */
async function getAdaptiveMtDataset(
  projectId,
  location = 'us-central1',
  datasetId = 'my-adaptive-mt-dataset',
) {
  const name = client.adaptiveMtDatasetPath(projectId, location, datasetId);

  const request = {
    name: name,
  };

  try {
    const [dataset] = await client.getAdaptiveMtDataset(request);

    console.log("Adaptive MT Dataset retrieved:");
    console.log(`  Name: ${dataset.name}`);
    console.log(`  Source Language: ${dataset.sourceLanguageCode}`);
    console.log(`  Target Language: ${dataset.targetLanguageCode}`);
  } catch (err) {
    // Handle the case where the dataset is not found.
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Adaptive MT Dataset ${datasetId} not found in location ${location} for project ${projectId}.`,
      );
      console.log(
        'Please ensure the dataset ID, location, and project ID are correct.',
      );
    } else {
      console.error(`Error getting Adaptive MT Dataset ${datasetId}:`, err);
      // For other errors, log the full error for debugging.
      // Consider adding more specific error handling based on common API errors.
    }
  }
}
// [END translate_v3_translationservice_adaptivemtdataset_get_async]

// Command-line execution
async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  const datasetId = args[2];

  await getAdaptiveMtDataset(projectId, location, datasetId);
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
  main(process.argv.slice(2));
}

module.exports = { getAdaptiveMtDataset };
