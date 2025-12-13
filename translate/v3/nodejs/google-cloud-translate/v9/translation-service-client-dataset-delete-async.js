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

// [START translate_v3_translationservice_dataset_delete_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Deletes a dataset and all of its contents.
 *
 * Dataset identifiers are automatically assigned, alphanumeric strings.
 * You can look up your dataset identifier by using listDataset.
 *
 * @param {string} projectId The ID of the Google Cloud Project.
 * @param {string} location The location of the dataset (e.g., 'us-central1').
 * @param {string} datasetId The ID of the dataset to delete. (e.g., '123abc456')
 */
async function deleteDataset(projectId, location = 'us-central1', datasetId) {
  const name = client.datasetPath(projectId, location, datasetId);

  const request = {
    name,
  };

  try {
    // Deletes a dataset using a long-running operation.
    // The operation will be complete when the dataset is deleted.
    const [operation] = await client.deleteDataset(request);
    await operation.promise();
    console.log(`Dataset ${datasetId} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Dataset ${datasetId} not found in location ${location} for project ${projectId}. ` +
          'Please ensure the dataset ID, location, and project ID are correct.',
      );
    } else {
      // Log other unexpected errors.
      console.error(`Error deleting dataset ${datasetId}:`, err);
    }
  }
}
// [END translate_v3_translationservice_dataset_delete_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }

  const projectId = args[0];
  const location = args[1];
  const datasetId = args[2];

  await deleteDataset(projectId, location, datasetId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Dataset ID like 'my-dataset-id'

Usage:

 node ${process.argv[1]} <projectId> <location> <datasetId>
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteDataset,
};
