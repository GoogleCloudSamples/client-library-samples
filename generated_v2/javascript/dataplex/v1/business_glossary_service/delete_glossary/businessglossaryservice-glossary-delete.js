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

// [START dataplex_v1_businessglossaryservice_glossary_delete]
'use strict';

const {BusinessGlossaryServiceClient} = require('@google-cloud/dataplex');
const {status} = require('@grpc/grpc-js');

const client = new BusinessGlossaryServiceClient();

/**
 * Deletes an existing glossary.
 *
 * @param {string} locationId - The Google Cloud region where the glossary is located (for example, 'us-central1').
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} glossaryId - The caller-chosen identifier of the Glossary to delete.
 */
async function deleteGlossary(locationId, projectId, glossaryId) {
  const name = `projects/${projectId}/locations/${locationId}/glossaries/${glossaryId}`;

  try {
    // All child categories and terms must be deleted before deleting the glossary.
    const [operation] = await client.deleteGlossary({name});
    const [response] = await operation.promise();

    console.log(`Successfully deleted glossary: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Glossary not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Glossary has child categories or terms remaining: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied deleting glossary: ${err.message}`);
    } else {
      console.error(`Failed to delete glossary: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteGlossary };
// [END dataplex_v1_businessglossaryservice_glossary_delete]
