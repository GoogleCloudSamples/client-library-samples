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

// [START discoveryengine_v1beta_documentservice_document_delete]
'use strict';

const {DocumentServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new DocumentServiceClient();

/**
 * Use the deleteDocument method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} collectionId - ID of the Collection (for example, 'example-collection-id')
 * @param {string} dataStoreId - ID of the DataStore (for example, 'example-datastore-id')
 * @param {string} branchId - ID of the Branch (for example, 'example-branch-id')
 * @param {string} documentId - ID of the Document (for example, 'example-document-id')
 */
async function deleteDocument(projectId, locationId, collectionId, dataStoreId, branchId, documentId) {
  try {
    const name = client.projectLocationCollectionDataStoreBranchDocumentPath(
      projectId,
      locationId,
      collectionId,
      dataStoreId,
      branchId,
      documentId
    );

    const request = {
      name,
    };

    await client.deleteDocument(request);
    console.log(`Deleted document: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Document not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteDocument };
// [END discoveryengine_v1beta_documentservice_document_delete]
