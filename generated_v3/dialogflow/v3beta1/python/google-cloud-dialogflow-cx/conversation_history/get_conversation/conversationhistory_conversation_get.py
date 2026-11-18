# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START dialogflow_v3beta1_conversationhistory_conversation_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def get_conversation(
    project_id: str, location_id: str, agent_id: str, conversation_id: str
) -> None:
    """Retrieves a conversation from Dialogflow CX conversation history.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        conversation_id: ID of the Conversation (for example, 'example-conversation-id').
    """
    api_endpoint = (
        f"{location_id}-dialogflow.googleapis.com"
        if location_id and location_id != "global"
        else "dialogflow.googleapis.com"
    )
    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )

    client = dialogflowcx_v3beta1.ConversationHistoryClient(
        client_options=client_options
    )

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/agents/{agent_id}/conversations/{conversation_id}"
    )

    request = dialogflowcx_v3beta1.GetConversationRequest(
        name=name,
    )

    try:
        response = client.get_conversation(request=request)
        print(f"Conversation name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve conversation: {error}")
# [END dialogflow_v3beta1_conversationhistory_conversation_get]
