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

# [START dialogflow_v3_playbooks_playbookversions_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3


def list_playbook_versions(
    project_id: str, location_id: str, agent_id: str, playbook_id: str
) -> None:
    """Lists versions of a specified playbook in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        agent_id: The Agent ID (for example, 'example-agent-id').
        playbook_id: The Playbook ID (for example, 'example-playbook-id').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.PlaybooksClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"agents/{agent_id}/playbooks/{playbook_id}"
    )

    request = dialogflowcx_v3.ListPlaybookVersionsRequest(
        parent=parent,
    )

    try:
        response = client.list_playbook_versions(request=request)
        for playbook_version in response:
            print(f"Playbook version name: {playbook_version.name}")
            print(f"Description: {playbook_version.description}")
    except GoogleAPICallError as e:
        print(f"API request failed: {e}")


# [END dialogflow_v3_playbooks_playbookversions_list]
