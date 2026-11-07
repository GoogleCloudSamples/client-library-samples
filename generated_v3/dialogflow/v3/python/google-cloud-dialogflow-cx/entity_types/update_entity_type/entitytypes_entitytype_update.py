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

# [START dialogflow_v3_entitytypes_entitytype_update]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_entity_type(
    project_id: str, location_id: str, agent_id: str, entity_type_id: str
) -> None:
    """Updates an existing entity type in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID of the Dialogflow CX agent.
        agent_id: The ID of the Dialogflow CX agent.
        entity_type_id: The ID of the entity type to update.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.EntityTypesClient(client_options=client_options)

    entity_type = dialogflowcx_v3.EntityType(
        name=f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/entityTypes/{entity_type_id}",
        display_name="updated-entity-type",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    request = dialogflowcx_v3.UpdateEntityTypeRequest(
        entity_type=entity_type,
        update_mask=update_mask,
    )

    try:
        response = client.update_entity_type(request=request)
        print(f"Updated entity type: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Update failed: {e}")
# [END dialogflow_v3_entitytypes_entitytype_update]
