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

// [START developerknowledge_v1_developerknowledge_batch_get_documents]
'use strict';

const {DeveloperKnowledgeClient} = require('@google/developer-knowledge');
const {status} = require('@grpc/grpc-js');

const client = new DeveloperKnowledgeClient();

/**
 * Use the batchGetDocuments method
 *
 * @param {string} documentId - The ID of the document (URI without scheme, e.g., 'docs.cloud.google.com/storage/docs/creating-buckets').
 */
async function batchGetDocuments(documentId) {
  try {
    const names = [`documents/${documentId}`];
    const [response] = await client.batchGetDocuments({names});

    for (const document of response.documents || []) {
      console.log(`Document resource name: ${document.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Document not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error occurred (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { batchGetDocuments };
// [END developerknowledge_v1_developerknowledge_batch_get_documents]
