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

// [START dataplex_v1_businessglossaryservice_glossary_update]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Use the updateGlossary method
 *
 * @param {string} locationId - The Google Cloud region where the glossary is located (for example, 'us-central1').
 * @param {string} glossaryId - The identifier of the glossary to update.
 * @param {string} projectId - The ID of the Google Cloud project.
 */
async function updateGlossary(locationId, glossaryId, projectId) {
  try {
    const updateMask = {
      paths: ['description'],
    };
    const glossary = {
      name: `projects/${projectId}/locations/${locationId}/glossaries/${glossaryId}`,
      description: 'Updated glossary description',
    };

    const [operation] = await client.updateGlossary({
      glossary,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated glossary: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { updateGlossary };
// [END dataplex_v1_businessglossaryservice_glossary_update]
