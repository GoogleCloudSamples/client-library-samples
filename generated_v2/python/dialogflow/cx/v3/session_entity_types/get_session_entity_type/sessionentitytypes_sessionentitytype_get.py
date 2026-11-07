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

# [START dialogflow_v3_sessionentitytypes_sessionentitytype_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def get_session_entity_type(
    project_id: str,
    location_id: str,
    agent_id: str,
    session_id: str,
    entity_type_id: str,
) -> None:
    """Retrieves a session entity type from an active session.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Dialogflow CX agent is located (for example, 'us-central1' or 'global').
        agent_id: The server-generated ID of the Dialogflow CX agent (for example, '12345678-abcd-1234-abcd-1234567890ab'). Read this from an existing agent.
        session_id: The caller-chosen identifier for the conversation session (for example, 'example-session-1234').
        entity_type_id: The ID of the session entity type (for example, 'example-entity-type-id').
    """
    # Construct the session entity type resource identifier
    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"sessions/{session_id}/entityTypes/{entity_type_id}"
    )

    # Initialize a regional client when communicating outside the global region
    if location_id != "global":
        client = dialogflowcx_v3.SessionEntityTypesClient(
            client_options={"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        )
    else:
        client = dialogflowcx_v3.SessionEntityTypesClient()

    request = dialogflowcx_v3.GetSessionEntityTypeRequest(
        name=name,
    )

    try:
        response = client.get_session_entity_type(request=request)
        print(f"Retrieved session entity type: {response.name}")
        print(f"Entity override mode: {response.entity_override_mode}")
        print(f"Entities count: {len(response.entities)}")
    except google.api_core.exceptions.NotFound:
        print(f"Session entity type not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3_sessionentitytypes_sessionentitytype_get]
