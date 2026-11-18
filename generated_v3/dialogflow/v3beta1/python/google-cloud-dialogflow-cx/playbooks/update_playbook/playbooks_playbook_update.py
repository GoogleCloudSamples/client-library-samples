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

# [START dialogflow_v3beta1_playbooks_playbook_update]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3beta1
from google.protobuf import field_mask_pb2


def update_playbook(
    project_id: str, location_id: str, agent_id: str, playbook_id: str
) -> None:
    """Updates the display name of an existing Dialogflow CX playbook.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location identifier of the Dialogflow CX agent (for
          example, 'global' or 'us-central1').
        agent_id: The unique identifier of the Dialogflow CX agent.
        playbook_id: The unique identifier of the playbook to update.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3beta1.PlaybooksClient(client_options=client_options)

    playbook_name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"playbooks/{playbook_id}"
    )

    playbook = dialogflowcx_v3beta1.Playbook(
        name=playbook_name,
        display_name="example-updated-playbook",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_playbook(
            playbook=playbook,
            update_mask=update_mask,
        )
        print(f"Updated playbook: {response.name}")
        print(f"Display name: {response.display_name}")
    except GoogleAPICallError as e:
        print(f"Update playbook request failed: {e}")
# [END dialogflow_v3beta1_playbooks_playbook_update]
