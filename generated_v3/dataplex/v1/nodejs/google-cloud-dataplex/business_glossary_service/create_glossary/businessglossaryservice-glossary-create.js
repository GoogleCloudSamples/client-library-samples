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

// [START dataplex_v1_businessglossaryservice_glossary_create]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Use the createGlossary method
 *
 * @param {string} locationId - The Google Cloud region where the glossary is located (for example, 'us-central1').
 * @param {string} glossaryId - The caller-assigned identifier for the glossary to create (for example, 'example-glossary').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function createGlossary(locationId, glossaryId, projectId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const glossary = {
      displayName: 'Example Business Glossary',
      description: 'A glossary containing standard business terminology.',
    };

    const request = {
      parent,
      glossaryId,
      glossary,
    };

    const [operation] = await client.createGlossary(request);
    const [response] = await operation.promise();

    console.log(`Created glossary: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Glossary already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create glossary: ${err.message}`);
    }
  }
}

module.exports = { createGlossary };
// [END dataplex_v1_businessglossaryservice_glossary_create]
