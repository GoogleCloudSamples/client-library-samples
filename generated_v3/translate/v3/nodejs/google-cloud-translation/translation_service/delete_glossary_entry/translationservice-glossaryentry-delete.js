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

// [START translate_v3_translationservice_glossaryentry_delete]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Use the deleteGlossaryEntry method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The regional location ID (for example, 'us-central1'). Custom glossaries require a regional location.
 * @param {string} glossaryId - The ID of the glossary containing the entry.
 * @param {string} glossaryEntryId - The ID of the glossary entry to delete.
 */
async function deleteGlossaryEntry(projectId, locationId, glossaryId, glossaryEntryId) {
  try {
    const name = client.glossaryEntryPath(
      projectId,
      locationId,
      glossaryId,
      glossaryEntryId
    );

    const request = {
      name,
    };

    await client.deleteGlossaryEntry(request);
    console.log(`Deleted glossary entry: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary entry not found: ${err.message}`);
    } else {
      console.error(`Failed to delete glossary entry: ${err.message}`);
    }
  }
}

module.exports = { deleteGlossaryEntry };
// [END translate_v3_translationservice_glossaryentry_delete]
