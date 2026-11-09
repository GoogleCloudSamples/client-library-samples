// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START dataplex_v1_businessglossaryservice_glossaryterm_create]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Creates a Dataplex glossary term.
 *
 * @param {string} locationId - The Google Cloud region where the glossary is located (for example, 'us-central1').
 * @param {string} glossaryId - The identifier of the parent Glossary resource (for example, 'example-glossary-id').
 * @param {string} termId - The identifier of the GlossaryTerm to create (for example, 'example-term-id').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createGlossaryTerm(locationId, glossaryId, termId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/glossaries/${glossaryId}`;
    const term = {
      parent,
      displayName: 'Example Glossary Term',
      description: 'A definition for the example glossary term.',
    };

    const request = {
      parent,
      termId,
      term,
    };

    const [response] = await client.createGlossaryTerm(request);
    console.log(`Created glossary term: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Glossary term already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent glossary not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create glossary term: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createGlossaryTerm };
// [END dataplex_v1_businessglossaryservice_glossaryterm_create]
