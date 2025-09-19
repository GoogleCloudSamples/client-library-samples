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

// [START translate_v3_translationservice_supportedlanguages_get_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Get a list of supported languages for translation.
 *
 * This sample demonstrates how to retrieve the list of languages supported by the
 * Cloud Translation API for a given project and location.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-123')
 * @param {string} location The location to list supported languages from (e.g., 'global', 'us-central1').
 *     For AutoML models, a regional location (e.g., 'us-central1') is required.
 */
async function getSupportedLanguages(projectId, location = 'global') {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
    // Each language's display name will be localized as configured.
    displayLanguageCode: 'en',
  };

  try {
    const [response] = await client.getSupportedLanguages(request);

    console.log('Supported Languages:');
    for (const language of response.languages) {
      console.log(`Language Code: ${language.languageCode}`);
      console.log(`\tDisplay Name: ${language.displayName}`);
      console.log(`\tSupports Source: ${language.supportSource}`);
      console.log(`\tSupports Target: ${language.supportTarget}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' or location '${location}' not found, or API not enabled.`,
      );
      console.error(
        'Please ensure the project ID is correct, the location is valid (e.g., "global"), and the Cloud Translation API is enabled for your project.',
      );
    } else {
      // For any other errors, log the full error for debugging.
      console.error('Error getting supported languages:', err);
    }
  }
}
// [END translate_v3_translationservice_supportedlanguages_get_async]

async function main(args) {
  if (args.length < 1) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }

  const projectId = args[0];
  const location = args[1];

  await getSupportedLanguages(projectId, location);
}

if (require.main === module) {
  process.on('unhandledException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project ID (e.g., 'my-project-id')
 - Google Cloud Location (e.g., 'global', 'us-central1')

Usage:

 node ${process.argv[1]} my-project-id global
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getSupportedLanguages,
};
