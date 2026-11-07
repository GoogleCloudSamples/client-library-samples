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

// [START discoveryengine_v1_documentservice_document_get]
'use strict';

const {DocumentServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new DocumentServiceClient();

/**
 * Retrieves a document from a data store.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The location ID where the service is located (for example, 'global', 'us', or 'eu').
 * @param {string} dataStoreId - The caller-chosen ID of the DataStore (for example, 'example-data-store-id').
 * @param {string} branchId - The ID of the Branch (for example, '0' or 'default_branch').
 * @param {string} documentId - The ID of the Document to retrieve (for example, 'example-document-id').
 */
async function getDocument(projectId, locationId, dataStoreId, branchId, documentId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/dataStores/${dataStoreId}/branches/${branchId}/documents/${documentId}`;

    const request = {
      name,
    };

    const [document] = await client.getDocument(request);

    console.log(`Document retrieved successfully: ${document.name}`);
    console.log(`Document ID: ${document.id}`);

    return document;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Document not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Error retrieving document: ${err.message}`);
    }
  }
}

module.exports = { getDocument };
// [END discoveryengine_v1_documentservice_document_get]
