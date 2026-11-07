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

// [START discoveryengine_v1_conversationalsearchservice_conversations_list]
'use strict';

const {ConversationalSearchServiceClient} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new ConversationalSearchServiceClient();

/**
 * Use the listConversations method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} collectionId - ID of the Collection (for example, 'example-collection-id')
 * @param {string} dataStoreId - ID of the DataStore (for example, 'example-datastore-id')
 */
async function listConversations(projectId, locationId, collectionId, dataStoreId) {
  try {
    const parent = client.projectLocationCollectionDataStorePath(
      projectId,
      locationId,
      collectionId,
      dataStoreId
    );

    const request = {
      parent,
    };

    const [conversations] = await client.listConversations(request);

    for (const conversation of conversations) {
      console.log(`Conversation name: ${conversation.name}`);
      console.log(`Conversation state: ${conversation.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API Error [Code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listConversations };
// [END discoveryengine_v1_conversationalsearchservice_conversations_list]
