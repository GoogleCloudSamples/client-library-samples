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

# [START dialogflow_v3beta1_playbooks_playbookversion_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def create_playbook_version(
    project_id: str, location_id: str, agent_id: str, playbook_id: str
) -> None:
    """Creates a version snapshot of a Dialogflow CX playbook.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the Agent (for example, 'example-agent-id').
        playbook_id: The ID of the Playbook (for example, 'example-playbook-id').
    """
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client_options = ClientOptions(
            api_endpoint=api_endpoint, quota_project_id=project_id
        )
    else:
        client_options = ClientOptions(quota_project_id=project_id)

    client = dialogflowcx_v3beta1.PlaybooksClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"playbooks/{playbook_id}"
    )
    playbook_version = dialogflowcx_v3beta1.PlaybookVersion(
        description="Release candidate version"
    )

    try:
        response = client.create_playbook_version(
            parent=parent,
            playbook_version=playbook_version,
        )
        print(f"Created Playbook Version: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END dialogflow_v3beta1_playbooks_playbookversion_create]
