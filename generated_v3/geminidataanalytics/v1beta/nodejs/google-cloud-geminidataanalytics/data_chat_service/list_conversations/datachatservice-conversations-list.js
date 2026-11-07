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

// [START geminidataanalytics_v1beta_datachatservice_conversations_list]
'use strict';

const {DataChatServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataChatServiceClient();

/**
 * Use the listConversations method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listConversations(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [conversations] = await client.listConversations({
      parent: parent,
    });

    console.log(`Retrieved ${conversations.length} conversation(s).`);
    for (const conversation of conversations) {
      console.log(`Conversation: ${conversation.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listConversations };
// [END geminidataanalytics_v1beta_datachatservice_conversations_list]
