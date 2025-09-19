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

// [START translate_v3_translationservice_datasets_list_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Lists all datasets available in the specified project and location.
 *
 * A dataset is a collection of parallel sentence pairs that are used to train
 * and evaluate custom translation models.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 */
async function listDatasets(projectId, location = 'us-central1') {
  // Construct the parent path for the request.
  // The `parent` parameter represents the project and location under which to list datasets.
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
  };

  try {
    const [datasets] = await client.listDatasets(request);

    if (datasets.length === 0) {
      console.log(
        `No datasets found in location ${location} for project ${projectId}`,
      );
      return;
    }

    console.log('Datasets:');
    for (const dataset of datasets) {
      console.log(`Dataset name: ${dataset.name}`);
      console.log(`\tDisplay name: ${dataset.displayName}`);
      console.log(`\tSource language code: ${dataset.sourceLanguageCode}`);
      console.log(`\tTarget language code: ${dataset.targetLanguageCode}`);
      console.log(`\tExample count: ${dataset.exampleCount}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' or location '${location}' not found. Please ensure they exist and are correct.`,
      );
    } else {
      // For all other errors, log the full error message.
      console.error('Error listing datasets:', err.message);
    }
  }
}
// [END translate_v3_translationservice_datasets_list_async]

async function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  await listDatasets(projectId, location);
}

if (require.main === module) {
  process.on('unhandledException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID (e.g., 'my-project-id')
 - Google Cloud Location (e.g., 'us-central1')

Usage:

 node ${process.argv[1]} my-project-id us-central1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listDatasets,
};
