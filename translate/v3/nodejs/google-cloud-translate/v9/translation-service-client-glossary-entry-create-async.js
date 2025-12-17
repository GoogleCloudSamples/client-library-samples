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

const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

// [START translate_v3_translationservice_glossaryentry_create_async]
// Instantiates a client
// Callbacks for client methods can be found in the Node.js SDK documentation
// at https://cloud.google.com/nodejs/docs/reference/translate/latest.
const client = new TranslationServiceClient();

/**
 * Create a glossary entry for a specific glossary.
 *
 * A glossary entry defines a term and its translation within a glossary.
 * This sample demonstrates creating a unidirectional glossary entry.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} glossaryId The ID of the glossary to add the entry to (e.g., 'my-glossary')
 */
async function createGlossaryEntry(
  projectId,
  location = 'us-central1',
  glossaryId = 'my-glossary',
) {
  // Construct the parent glossary resource name.
  const parent = client.glossaryPath(projectId, location, glossaryId);

  const request = {
    parent: parent,
    glossaryEntry: {
      termsSet: {
        terms: [
          {
            languageCode: 'en',
            text: 'bye',
          },
          {
            languageCode: 'es',
            text: 'adios',
          },
        ],
      },
    },
  };

  try {
    const [glossaryEntry] = await client.createGlossaryEntry(request);
    console.log(`Created glossary entry: ${glossaryEntry.name}`);
    console.log(
      `\tSource term: '${glossaryEntry.termsSet.terms[0].text}' (${glossaryEntry.termsSet.terms[0].languageCode})`,
    );
    console.log(
      `\tTarget term: '${glossaryEntry.termsSet.terms[1].text}' (${glossaryEntry.termsSet.terms[1].languageCode})`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Glossary '${glossaryId}' not found in location '${location}' of project '${projectId}'. ` +
          'Please ensure the glossary exists before creating entries.',
      );
    } else if (err.code === status.ALREADY_EXISTS) {
      // This error might occur if an entry with the same name already exists.
      console.error(
        `Error: A similar glossary entry might already exist for source term 'hello' ` +
          `and target term 'hola' in glossary '${glossaryId}'. Details:`,
        err.details,
      );
    } else {
      console.error('Error creating glossary entry:', err);
    }
  }
}
// [END translate_v3_translationservice_glossaryentry_create_async]

function main(args) {
  if (args.length < 3) {
    throw new Error(
      `Usage: node ${process.argv[1]} <projectId> <location> <glossaryId>`,
    );
  }
  const projectId = args[0];
  const location = args[1];
  const glossaryId = args[2];

  createGlossaryEntry(projectId, location, glossaryId);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      "To run this sample from the command-line, specify three arguments:\n" +
        " - Google Cloud Project ID like 'example-project-168'\n" +
        " - Google Cloud Location like 'us-central1'\n" +
        " - Glossary ID like 'my-glossary'\n" +
        "Usage:\n\n" +
        " node create-glossary-entry.js example-project-168 us-central1 my-glossary",
    );
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}
