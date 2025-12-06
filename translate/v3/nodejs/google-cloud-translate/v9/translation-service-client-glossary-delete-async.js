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

// [START translate_v3_translationservice_glossary_delete_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Deletes the specified glossary.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} glossaryName The Glossary name, unique per project and location (e.g., 'example-glossary-name')
 */
async function deleteGlossary(
  projectId,
  location = 'us-central1',
  glossaryName = 'example-glossary-name',
) {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    name: `projects/${projectId}/locations/${location}/glossaries/${glossaryName}`,
  };

  try {
    // Delete glossary using a long-running operation.
    // Await its completion to ensure the glossary is fully deleted.
    const [operation] = await client.deleteGlossary(request);
    await operation.promise();
    console.log(`Deleted glossary: ${glossaryName}`);
  } catch (err) {
    // Check if the error is due to the glossary not being found.
    // This is a common, user-correctable error.
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Glossary '${glossaryName}' does not exist in location '${location}' of project '${projectId}'.`,
      );
      console.log('Please ensure the glossary name and location are correct.');
    } else {
      // For other errors, log the full error details.
      console.error(`Error deleting glossary '${glossaryName}':`, err);
    }
  }
}
// [END translate_v3_translationservice_glossary_delete_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  deleteGlossary(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'

Usage:

 node deleteGlossary.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteGlossary,
};
