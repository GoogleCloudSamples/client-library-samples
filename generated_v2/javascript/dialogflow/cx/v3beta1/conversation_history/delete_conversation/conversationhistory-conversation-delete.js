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

// [START dialogflow_v3beta1_conversationhistory_conversation_delete]
'use strict';

const {ConversationHistoryClient} = require('@google-cloud/dialogflow-cx').v3beta1;
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a conversation from Dialogflow CX conversation history.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the agent is hosted (for example, 'us-central1')
 * @param {string} agentId - The server-generated ID of the Dialogflow CX agent.
 * @param {string} conversationId - The server-generated ID of the conversation to delete.
 */
async function deleteConversation(projectId, locationId, agentId, conversationId) {
  const apiEndpoint =
    locationId && locationId !== 'global'
      ? `${locationId}-dialogflow.googleapis.com`
      : 'dialogflow.googleapis.com';
  const client = new ConversationHistoryClient({apiEndpoint});

  try {
    const name = `projects/${projectId}/locations/${locationId}/agents/${agentId}/conversations/${conversationId}`;
    const request = {
      name,
    };

    await client.deleteConversation(request);
    console.log(`Deleted conversation: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Conversation not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = {deleteConversation};
// [END dialogflow_v3beta1_conversationhistory_conversation_delete]
