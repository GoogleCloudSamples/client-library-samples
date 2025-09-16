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

// [START translate_v3_translationservice_glossary_create_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Create a glossary that can support two or more languages.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 * Initial glossary terms are loaded from a CSV file hosted on Cloud Storage.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'example-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} glossaryName The Glossary name, unique per project and location (e.g., 'example-glossary-name')
 */
async function createGlossary(
  projectId,
  location = 'us-central1',
  glossaryName = 'example-glossary-name',
) {
  const glossaryConfig = {
    // This glossary translates between English and Spanish.
    languageCodesSet: {
      languageCodes: ['en', 'es'],
    },
    // Initial glossary terms are loaded from a CSV file on Cloud Storage.
    // Additional terms can be added by creating new Glossary Entries.
    inputConfig: {
      gcsSource: {
        inputUri: 'gs://cloud-samples-data/translation/glossary.csv',
      },
    },
    name: `projects/${projectId}/locations/${location}/glossaries/${glossaryName}`,
  };

  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    glossary: glossaryConfig,
  };

  try {
    // Create Glossary using a long-running operation.
    const [operation] = await client.createGlossary(request);
    // Wait for the operation to complete.
    const [glossary] = await operation.promise();
    console.log(`Created glossary: ${glossary.name}`);
    console.log(`Input URI: ${glossary.inputConfig.gcsSource.inputUri}`);
    console.log(`Entry Count: ${glossary.entryCount}`);
  } catch (err) {
    // Glossary already exists.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Glossary ${glossaryName} already exists in location ${location} of project ${projectId}`,
      );
    } else {
      console.error(`Error creating glossary ${glossaryName}:`, err);
    }
  }
}
// [END translate_v3_translationservice_glossary_create_async]

async function main(args) {
  if (args.length < 3) {
    throw new Error(`Only ${args.length} arguments provided.`);
  }
  createGlossary(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Resource name like 'example-resource-id'

Usage:

 node create-glossary.js example-project-168 us-central1 example-resource-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  createGlossary,
};
