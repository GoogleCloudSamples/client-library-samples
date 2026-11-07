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

// [START dataplex_v1_businessglossaryservice_glossarycategory_create]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Creates a category for a Dataplex glossary.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} glossaryId - The glossary identifier (for example, 'example-glossary-id').
 * @param {string} categoryId - The category identifier (for example, 'example-category-id').
 */
async function createGlossaryCategory(locationId, glossaryId, categoryId) {
  try {
    const projectIdOrNumber = await client.getProjectId();
    const parent = `projects/${projectIdOrNumber}/locations/${locationId}/glossaries/${glossaryId}`;
    const category = {
      displayName: 'Example Category',
      description: 'Description for example category',
    };

    const request = {
      parent,
      categoryId,
      category,
    };

    const [response] = await client.createGlossaryCategory(request);
    console.log(`Created glossary category: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Glossary category already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createGlossaryCategory};
// [END dataplex_v1_businessglossaryservice_glossarycategory_create]
