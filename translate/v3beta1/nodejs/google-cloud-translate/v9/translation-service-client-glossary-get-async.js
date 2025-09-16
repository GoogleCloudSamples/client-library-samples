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

// [START translate_v3beta1_translationservice_glossary_get_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const { status } = require('@grpc/grpc-js');

// Instantiates a client
// The client is created once and reused for multiple calls to the API.
// It's recommended to create a client outside of the function that makes API calls,
// and then pass it in or make it a global variable.
const client = new TranslationServiceClient();

/**
 * Gets the specified glossary.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} glossaryName The Glossary name, unique per project and location (e.g., 'example-glossary-name')
 */
async function getGlossary(
  projectId,
  location = 'us-central1',
  glossaryName = 'my-glossary',
) {
  const request = {
    name: client.glossaryPath(projectId, location, glossaryName),
  };

  try {
    const [glossary] = await client.getGlossary(request);

    console.log(`Glossary name: ${glossary.name}`);
    console.log(`\tInput URI: ${glossary.inputConfig.gcsSource.inputUri}`);
    console.log(`\tEntry Count: ${glossary.entryCount}`);
  } catch (err) {
    // Glossary does not exist.
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Glossary '${glossaryName}' does not exist in location '${location}' of project '${projectId}'.`,
      );
      console.log('Please ensure the glossary name and location are correct.');
      console.log(
        'You might need to create the glossary first if it does not exist.',
      );
    } else {
      console.error(`Error getting glossary '${glossaryName}':`, err);
    }
  }
}
// [END translate_v3beta1_translationservice_glossary_get_async]

function main(args) {
  // However, for command-line execution, we require specific arguments to demonstrate usage.
  if (args.length < 3) {
    throw new Error(
      `Only ${args.length} arguments provided. Please provide projectId, location, and glossaryName.`,
    );
  }
  getGlossary(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`
To run this sample from the command-line, specify three arguments:
  1. Google Cloud Project ID (e.g., 'my-project-id')
  2. Google Cloud Location (e.g., 'us-central1')
  3. Glossary Name (e.g., 'my-glossary-name')

Usage:
  node ${process.argv[1]} <projectId> <location> <glossaryName>

Example:
  node ${process.argv[1]} cloud-samples-data us-central1 my-glossary
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getGlossary,
};
