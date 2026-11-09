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

// [START discoveryengine_v1alpha_documentservice_document_create]
'use strict';

const {DocumentServiceClient} = require('@google-cloud/discoveryengine').v1alpha;
const {status} = require('@grpc/grpc-js');

const client = new DocumentServiceClient();

/**
 * Use the createDocument method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} collectionId - ID of the Collection (for example, 'example-collection-id')
 * @param {string} dataStoreId - ID of the DataStore (for example, 'example-datastore-id')
 * @param {string} branchId - ID of the Branch (for example, 'example-branch-id')
 * @param {string} documentId - ID of the Document (for example, 'example-document-id')
 */
async function createDocument(projectId, locationId, collectionId, dataStoreId, branchId, documentId) {
  try {
    const parent = client.projectLocationCollectionDataStoreBranchPath(
      projectId,
      locationId,
      collectionId,
      dataStoreId,
      branchId
    );

    const document = {
      structData: {
        title: 'Example Document Title',
        url: 'https://example.com/sample-document',
      },
    };

    const request = {
      parent,
      document,
      documentId,
    };

    const [response] = await client.createDocument(request);
    console.log(`Created document: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Document already exists: ${err.message}`);
    } else {
      console.error(`Failed to create document: ${err.message}`);
    }
  }
}

module.exports = { createDocument };
// [END discoveryengine_v1alpha_documentservice_document_create]
