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

# [START geminidataanalytics_v1_datachatservice_conversation_create]
import google.api_core.exceptions
from google.cloud import geminidataanalytics_v1

client = geminidataanalytics_v1.DataChatServiceClient()


def create_conversation(
    project_id: str, location_id: str, conversation_id: str
) -> None:
    """Creates a conversation resource in Gemini Data Analytics.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or 'global' where the conversation resource resides (for example, 'global' or 'us-central1').
        conversation_id: The client-assigned ID for the conversation to create. Must be unique within the parent and match '^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$'. If empty, the server auto-generates an ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    agent_path = f"projects/{project_id}/locations/{location_id}/dataAgents/example-data-agent"

    conversation = geminidataanalytics_v1.Conversation(
        agents=[agent_path],
        title="Sales Data Analysis",
    )

    try:
        response = client.create_conversation(
            parent=parent,
            conversation=conversation,
            conversation_id=conversation_id,
        )
        print(f"Created conversation: {response.name}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Failed to create conversation: {exc}")


# [END geminidataanalytics_v1_datachatservice_conversation_create]
