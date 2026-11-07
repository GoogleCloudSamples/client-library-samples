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

// [START developerknowledge_v1_developerknowledge_document_get]
'use strict';

const {DeveloperKnowledgeClient} = require('@google/developer-knowledge');
const {status} = require('@grpc/grpc-js');

const client = new DeveloperKnowledgeClient();

/**
 * Use the getDocument method
 *
 * @param {string} documentId - The document identifier, formatted as the documentation URI without scheme (for example, 'docs.cloud.google.com/storage/docs/creating-buckets').
 */
async function getDocument(documentId) {
  try {
    const name = `documents/${documentId}`;
    const [document] = await client.getDocument({name});

    console.log(`Document name: ${document.name}`);
    console.log(`Document title: ${document.title}`);
    return document;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Document not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to retrieve document: ${err.message}`);
    }
  }
}

module.exports = { getDocument };
// [END developerknowledge_v1_developerknowledge_document_get]
