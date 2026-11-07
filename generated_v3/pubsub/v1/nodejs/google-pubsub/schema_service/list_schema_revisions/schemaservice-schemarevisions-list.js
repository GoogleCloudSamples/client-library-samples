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

// [START pubsub_v1_schemaservice_schemarevisions_list]
'use strict';

const {SchemaServiceClient} = require('@google-cloud/pubsub-api');
const {status} = require('@grpc/grpc-js');

const client = new SchemaServiceClient();

/**
 * Use the listSchemaRevisions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} schemaId - The ID of the schema to list revisions for. This is a caller-chosen identifier created with the schema.
 */
async function listSchemaRevisions(projectId, schemaId) {
  const name = `projects/${projectId}/schemas/${schemaId}`;

  try {
    const request = {
      name,
    };

    const [revisions] = await client.listSchemaRevisions(request);

    console.log(`Retrieved ${revisions.length} revision(s) for schema: ${name}`);
    for (const revision of revisions) {
      console.log(`Revision ID: ${revision.revisionId}`);
      console.log(`Revision Name: ${revision.name}`);
      console.log(`Schema Type: ${revision.type}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema ${name} was not found.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing schema ${name}.`);
    } else {
      console.error(`Error listing schema revisions: ${err.message}`);
    }
  }
}

module.exports = { listSchemaRevisions };
// [END pubsub_v1_schemaservice_schemarevisions_list]
