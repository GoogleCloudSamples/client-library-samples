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

# [START dialogflow_v3beta1_sessionentitytypes_sessionentitytype_get]
from google.api_core import exceptions
from google.cloud import dialogflowcx_v3beta1


def get_session_entity_type(
    project_id: str,
    location_id: str,
    agent_id: str,
    session_id: str,
    entity_type_id: str,
) -> None:
    """Retrieves a session entity type from Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent.
        session_id: The caller-chosen ID of the session (for example, 'example-session-id').
        entity_type_id: The ID of the session entity type.
    """
    client_options = None
    if location_id and location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.SessionEntityTypesClient(
        client_options=client_options
    )

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"sessions/{session_id}/entityTypes/{entity_type_id}"
    )

    try:
        response = client.get_session_entity_type(name=name)
        print(f"Session entity type: {response.name}")
        print(f"Override mode: {response.entity_override_mode}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve session entity type: {error}")
# [END dialogflow_v3beta1_sessionentitytypes_sessionentitytype_get]
