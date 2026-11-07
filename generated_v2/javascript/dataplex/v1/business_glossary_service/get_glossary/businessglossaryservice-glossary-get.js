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

// [START dataplex_v1_businessglossaryservice_glossary_get]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Retrieves a Dataplex business glossary resource.
 *
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} glossaryId - ID of the Glossary (for example, 'example-glossary-id')
 */
async function getGlossary(locationId, glossaryId) {
  try {
    const projectIdOrNumber = await client.getProjectId();
    const name = `projects/${projectIdOrNumber}/locations/${locationId}/glossaries/${glossaryId}`;

    const request = {
      name,
    };

    const [response] = await client.getGlossary(request);
    console.log(`Resource name: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error retrieving glossary: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {getGlossary};
// [END dataplex_v1_businessglossaryservice_glossary_get]
