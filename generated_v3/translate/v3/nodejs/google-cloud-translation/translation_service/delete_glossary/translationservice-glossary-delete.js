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

// [START translate_v3_translationservice_glossary_delete]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Use the deleteGlossary method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location/region where the glossary resides.
 * @param {string} glossaryId - The ID of the glossary to delete.
 */
async function deleteGlossary(projectId, locationId, glossaryId) {
  try {
    const name = client.glossaryPath(projectId, locationId, glossaryId);
    const request = {
      name,
    };

    // DeleteGlossary is a long-running operation; wait for resolution
    const [operation] = await client.deleteGlossary(request);
    const [response] = await operation.promise();

    console.log(`Deleted glossary: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { deleteGlossary };
// [END translate_v3_translationservice_glossary_delete]
