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

// [START translate_v3_translationservice_glossaries_list]
'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');
const {status} = require('@grpc/grpc-js');

const client = new TranslationServiceClient();

/**
 * Use the listGlossaries method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location ID where glossaries are located (for example, 'us-central1').
 */
async function listGlossaries(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [glossaries] = await client.listGlossaries(request);

    if (glossaries.length === 0) {
      console.log('No glossaries found.');
      return;
    }

    for (const glossary of glossaries) {
      console.log(`Glossary name: ${glossary.name}`);
      console.log(`Entry count: ${glossary.entryCount}`);
      console.log(`Input URI: ${glossary.inputConfig?.gcsSource?.inputUri}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listGlossaries };
// [END translate_v3_translationservice_glossaries_list]
