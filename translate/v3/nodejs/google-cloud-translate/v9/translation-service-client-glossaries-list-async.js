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

// [START translate_v3_translationservice_glossaries_list_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Lists all glossaries available in the specified project and location.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 */
async function listGlossaries(projectId, location = 'us-central1') {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
  };

  try {
    const [glossaries] = await client.listGlossaries(request);

    if (glossaries.length === 0) {
      console.log(
        `No glossaries found in location ${location} of project ${projectId}`,
      );
      return;
    }

    console.log(
      `Glossaries found in project ${projectId}, location ${location}:`,
    );
    for (const glossary of glossaries) {
      console.log(`Glossary name: ${glossary.name}`);
      if (glossary.inputConfig && glossary.inputConfig.gcsSource) {
        console.log(
          `\tInput URI: ${glossary.inputConfig.gcsSource.inputUri}`,
        );
      }
      console.log(`\tEntry Count: ${glossary.entryCount}`);
    }
  } catch (err) {
    // Check if the error is a NOT_FOUND error, which typically indicates the project or location does not exist.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' or location '${location}' not found. ` +
          'Please ensure the project ID and location are correct and you have access.',
      );
    } else {
      // Log other types of errors with more detail.
      console.error('Error listing glossaries:', err.message || err);
    }
  }
}
// [END translate_v3_translationservice_glossaries_list_async]

function main(args) {
  if (args.length < 1) {
    throw new Error('Missing projectId argument.');
  }
  const projectId = args[0];
  const location = args[1] || 'us-central1'; // Default to 'us-central1' if not provided

  listGlossaries(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify at least the project ID:
 - Google Cloud Project ID like 'example-project-168'
 - Google Cloud Location like 'us-central1' (optional, defaults to 'us-central1')

Usage:

 node listGlossaries.js example-project-168 us-central1
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listGlossaries,
};
