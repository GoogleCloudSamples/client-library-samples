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

// [START translate_v3_translationservice_glossaryentries_list_async]
const {TranslationServiceClient} = require('@google-cloud/translate').v3;
const {status} = require('@grpc/grpc-js');

// Instantiates a client
const client = new TranslationServiceClient();

/**
 * Lists all glossary entries for a given glossary.
 *
 * This function demonstrates how to retrieve and display all entries within a
 * specified glossary. Glossary entries define terms and their translations,
 * which are used to customize translation behavior for specific domains.
 *
 * @param {string} projectId Your Google Cloud Project ID. Example: 'my-project-id'
 * @param {string} location The location of the glossary. Example: 'us-central1' or 'global'
 * @param {string} glossaryId The ID of the glossary to list entries for. Example: 'my-glossary'
 */
async function listGlossaryEntries(
  projectId,
  location = 'us-central1',
  glossaryId,
) {
  const glossaryPath = client.glossaryPath(projectId, location, glossaryId);

  const request = {
    parent: glossaryPath,
  };

  try {
    const [glossaryEntries] = await client.listGlossaryEntries(request);

    if (glossaryEntries.length === 0) {
      console.log(
        `No glossary entries found for glossary '${glossaryId}' in location '${location}' of project '${projectId}'.`
      );
      return;
    }

    console.log(
      `Glossary entries for '${glossaryId}' in '${location}' of project '${projectId}':`
    );

    for (const entry of glossaryEntries) {
      console.log(`Entry Name: ${entry.name}`);
      if (entry.termsSet) {
        console.log(
          `\tSource Term: ${entry.termsSet.terms[0].text} (${entry.termsSet.terms[0].languageCode})`
        );
        console.log(
          `\tTarget Term: ${entry.termsSet.terms[1].text} (${entry.termsSet.terms[1].languageCode})`
        );
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Glossary '${glossaryId}' not found in location '${location}' of project '${projectId}'.`
      );
      console.error(
        'Please ensure the glossary ID and location are correct and the glossary exists.'
      );
    } else {
      console.error('Error listing glossary entries:', err);
    }
  } finally {
    // Close the client to clean up resources.
    client.close();
  }
}
// [END translate_v3_translationservice_glossaryentries_list_async]

function main(args) {
  if (args.length < 3) {
    console.error(
      `Usage: node ${process.argv[1]} <projectId> <location> <glossaryId>`
    );
    process.exit(1);
  }

  const projectId = args[0];
  const location = args[1];
  const glossaryId = args[2];

  listGlossaryEntries(projectId, location, glossaryId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    // Only print generic usage if the error is not related to argument parsing.
    if (!err.message.includes('Usage:')) {
      console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID (e.g., 'your-project-id')
 - Google Cloud Location (e.g., 'us-central1' or 'global')
 - Glossary ID (e.g., 'my-glossary')

Usage:

 node ${process.argv[1]} your-project-id us-central1 my-glossary
`);
    }
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listGlossaryEntries,
};
