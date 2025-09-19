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

// [START translate_v3_translationservice_adaptivemtdataset_delete_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Deletes an Adaptive MT dataset.
 *
 * An Adaptive MT dataset is a collection of parallel sentences that can be used
 * to customize machine translation for specific domains or styles.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'YOUR_PROJECT_ID')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} datasetId The ID of the Adaptive MT dataset to delete (e.g., 'YOUR_DATASET_ID')
 */
async function deleteAdaptiveMtDataset(
  projectId,
  location = 'us-central1',
  datasetId = 'YOUR_DATASET_ID',
) {
  const name = client.adaptiveMtDatasetPath(projectId, location, datasetId);

  const request = {
    name,
  };

  try {
    await client.deleteAdaptiveMtDataset(request);
    console.log(`Adaptive MT dataset ${datasetId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Adaptive MT dataset ${datasetId} not found in location ${location} of project ${projectId}.`,
      );
      console.log(
        'Please ensure the dataset ID and location are correct and the dataset exists.',
      );
    } else {
      console.error(`Error deleting Adaptive MT dataset ${datasetId}:`, err);
      console.error(
        'An unexpected error occurred. Please check the error details and your project configuration.',
      );
    }
  }
}
// [END translate_v3_translationservice_adaptivemtdataset_delete_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  deleteAdaptiveMtDataset(args[0], args[1], args[2]);
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

module.exports = { deleteAdaptiveMtDataset };
