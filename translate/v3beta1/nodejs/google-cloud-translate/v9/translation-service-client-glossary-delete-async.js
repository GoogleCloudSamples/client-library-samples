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

// [START translate_v3beta1_translationservice_glossary_delete_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Deletes the specified glossary.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} glossaryId The ID of the glossary to delete (e.g., 'my-glossary')
 */
async function deleteGlossary(
  projectId,
  location = 'us-central1',
  glossaryId = 'my-glossary',
) {
  const name = client.glossaryPath(projectId, location, glossaryId);

  const request = {
    name: name,
  };

  try {
    // Delete glossary using a long-running operation.
    // Await this promise to ensure the operation completes.
    const [operation] = await client.deleteGlossary(request);
    // The operation.promise() method returns a Promise that resolves when the LRO is complete.
    await operation.promise();
    console.log(`Deleted glossary: ${glossaryId}`);
  } catch (err) {
    // Check if the error is due to the glossary not being found.
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Glossary '${glossaryId}' does not exist in location '${location}' of project '${projectId}'.`,
      );
      console.log(
        'Please ensure the glossary ID and location are correct, and that the glossary has not been deleted already.',
      );
    } else {
      // For any other errors, log the full error details.
      console.error(`Error deleting glossary '${glossaryId}':`, err);
      console.error(
        'An unexpected error occurred. Please check your project ID, location, network connection, and permissions.',
      );
    }
  }
}
// [END translate_v3beta1_translationservice_glossary_delete_async]

function main(args) {
  if (args.length < 3) {
    console.error(
      `Usage: node ${process.argv[1]} <projectId> <location> <glossaryId>`,
    );
    process.exit(1);
  }
  const projectId = args[0];
  const location = args[1];
  const glossaryId = args[2];
  deleteGlossary(projectId, location, glossaryId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteGlossary,
};
