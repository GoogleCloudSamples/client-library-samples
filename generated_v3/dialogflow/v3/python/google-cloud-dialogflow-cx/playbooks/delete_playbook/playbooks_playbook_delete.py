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

# [START dialogflow_v3_playbooks_playbook_delete]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def delete_playbook(
    project_id: str, location_id: str, agent_id: str, playbook_id: str
) -> None:
    """Deletes a playbook in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        playbook_id: The ID of the playbook (for example, 'example-playbook-id').
    """
    api_endpoint = (
        f"{location_id}-dialogflow.googleapis.com"
        if location_id != "global"
        else "dialogflow.googleapis.com"
    )
    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )

    client = dialogflowcx_v3.PlaybooksClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/playbooks/{playbook_id}"

    request = dialogflowcx_v3.DeletePlaybookRequest(
        name=name,
    )

    try:
        client.delete_playbook(request=request)
        print(f"Deleted playbook: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error deleting playbook: {error}")
# [END dialogflow_v3_playbooks_playbook_delete]
