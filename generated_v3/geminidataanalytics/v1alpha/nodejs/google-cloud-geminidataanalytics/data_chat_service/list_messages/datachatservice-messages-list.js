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

// [START geminidataanalytics_v1alpha_datachatservice_messages_list]
'use strict';

const {DataChatServiceClient} = require('@google-cloud/geminidataanalytics');
const {status} = require('@grpc/grpc-js');

const client = new DataChatServiceClient();

/**
 * Lists messages in a conversation.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the conversation is located (for example, 'us-central1').
 * @param {string} conversationId - The identifier of the conversation whose messages are to be listed (for example, 'example-conversation-id').
 */
async function listMessages(projectId, locationId, conversationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/conversations/${conversationId}`;

    const request = {
      parent,
    };

    const [messages] = await client.listMessages(request);
    for (const message of messages) {
      console.log(`Message: ${message.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { listMessages };
// [END geminidataanalytics_v1alpha_datachatservice_messages_list]
