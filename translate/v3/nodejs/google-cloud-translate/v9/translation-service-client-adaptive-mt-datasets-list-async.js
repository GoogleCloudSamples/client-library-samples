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

// [START translate_v3_translationservice_adaptivemtdatasets_list_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Lists all Adaptive MT datasets available in the specified project and location.
 *
 * Adaptive MT datasets are used to provide custom translation models with domain-specific examples.
 * This method retrieves a paginated list of such datasets.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The location of the Adaptive MT datasets (e.g., 'us-central1')
 */
async function listAdaptiveMtDatasets(projectId, location = 'us-central1') {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
  };

  try {
    const [adaptiveMtDatasets] = await client.listAdaptiveMtDatasets(request);

    if (adaptiveMtDatasets.length === 0) {
      console.log(
        `No Adaptive MT datasets found in location ${location} for project ${projectId}`,
      );
      return;
    }

    for (const dataset of adaptiveMtDatasets) {
      console.log(`Name: ${dataset.name}`);
      console.log(`  Source Language Code: ${dataset.sourceLanguageCode}`);
      console.log(`  Target Language Code: ${dataset.targetLanguageCode}`);
    }
  } catch (err) {
    // Handle the case where the project or location is not found or invalid.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified project '${projectId}' or location '${location}' was not found,` +
          " or you do not have permission to access it.",
      );
      console.error(
        'Please ensure the project ID and location are correct and that the service account' +
          ' has the necessary permissions (e.g., roles/cloudtranslate.viewer).',
      );
    } else {
      // Log any other errors that occur during the API call.
      console.error('Error listing Adaptive MT datasets:', err);
    }
  }
}
// [END translate_v3_translationservice_adaptivemtdatasets_list_async]

function main(args) {
  if (args.length < 2) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  const projectId = args[0];
  const location = args[1];
  listAdaptiveMtDatasets(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'

Usage:

 node ${process.argv[1]} my-project-id us-central1
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listAdaptiveMtDatasets,
};
