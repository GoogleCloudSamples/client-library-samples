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

// [START translate_v3_translationservice_glossary_get_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

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
  glossaryName = 'example-glossary-name',
) {
  // Construct the full resource name for the glossary.
  // Example: projects/PROJECT_ID/locations/LOCATION_ID/glossaries/GLOSSARY_ID
  const name = client.glossaryPath(projectId, location, glossaryName);

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    name: name,
  };

  try {
    // Send the getGlossary request.
    const [glossary] = await client.getGlossary(request);

    // Log the details of the retrieved glossary.
    console.log(`Glossary name: ${glossary.name}`);
    console.log(`Input URI: ${glossary.inputConfig.gcsSource.inputUri}`);
    console.log(`Entry Count: ${glossary.entryCount}`);
  } catch (err) {
    // Handle specific error: NOT_FOUND (glossary does not exist).
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Glossary ${glossaryName} does not exist in location ${location} of project ${projectId}`,
      );
    } else {
      // Log other unexpected errors.
      console.error(`Error getting glossary ${glossaryName}:`, err);
    }
  }
}
// [END translate_v3_translationservice_glossary_get_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  getGlossary(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'

Usage:

 node get-glossary.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getGlossary,
};
