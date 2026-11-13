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

# [START dialogflow_v3_sessionentitytypes_sessionentitytype_delete]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3


def delete_session_entity_type(
    project_id: str,
    location_id: str,
    agent_id: str,
    session_id: str,
    entity_type_id: str,
) -> None:
    """Deletes a session entity type in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        session_id: The ID of the session (for example, 'example-session-id').
        entity_type_id: The ID of the entity type (for example, 'example-entitytype-id').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.SessionEntityTypesClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"sessions/{session_id}/entityTypes/{entity_type_id}"
    )

    try:
        client.delete_session_entity_type(name=name)
        print(f"Deleted session entity type: {name}")
    except exceptions.NotFound as exc:
        print(f"Session entity type not found: {exc}")
    except exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete session entity type: {exc}")
# [END dialogflow_v3_sessionentitytypes_sessionentitytype_delete]
