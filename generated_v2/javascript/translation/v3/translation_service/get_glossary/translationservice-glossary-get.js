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

// [START translate_v3_translationservice_glossary_get]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Use the getGlossary method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (e.g., 'us-central1').
 * @param {string} glossaryId - The ID of the glossary.
 */
async function getGlossary(projectId, locationId, glossaryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/glossaries/${glossaryId}`;
    const request = {
      name,
    };

    const [response] = await client.getGlossary(request);

    console.log(`Glossary name: ${response.name}`);
    console.log(`Entry count: ${response.entryCount}`);
    console.log(`Input URI: ${response.inputConfig?.gcsSource?.inputUri}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve glossary: ${err.message}`);
    }
  }
}

module.exports = { getGlossary };
// [END translate_v3_translationservice_glossary_get]
