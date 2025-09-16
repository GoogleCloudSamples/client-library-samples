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

// [START translate_v3beta1_translationservice_glossary_create_async]
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const { status } = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Create a glossary that can support two or more languages.
 *
 * A glossary is a custom dictionary to configure translation for domain-specific terminology.
 * Initial glossary terms are loaded from a CSV file hosted on Cloud Storage.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The location of the glossary (e.g., 'us-central1')
 * @param {string} glossaryName The name of the glossary, unique per project and location (e.g., 'my-glossary-name')
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
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Glossary '${glossaryName}' already exists in location '${location}' of project '${projectId}'.`,
      );
    } else {
      console.error(`Error creating glossary '${glossaryName}':`, err);
    }
  }
}
// [END translate_v3beta1_translationservice_glossary_create_async]

function main(args) {
  if (args.length < 3) {
    console.error(
      `Usage: node ${process.argv[1]} <projectId> <location> <glossaryName>`,
    );
    process.exit(1);
  }
  const projectId = args[0];
  const location = args[1];
  const glossaryName = args[2];
  createGlossary(projectId, location, glossaryName);
}

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createGlossary,
};
