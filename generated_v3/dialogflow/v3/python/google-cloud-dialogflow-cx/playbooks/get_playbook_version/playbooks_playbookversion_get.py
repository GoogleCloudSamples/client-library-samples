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

# [START dialogflow_v3_playbooks_playbookversion_get]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3


def get_playbook_version(
    project_id: str,
    location_id: str,
    agent_id: str,
    playbook_id: str,
    version_id: str,
) -> None:
    """Retrieves a specific version of a Dialogflow CX playbook.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        playbook_id: The ID of the playbook (for example, 'example-playbook-id').
        version_id: The ID of the playbook version (for example, 'example-version-id').
    """
    # Construct the resource identifier for the target playbook version
    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"playbooks/{playbook_id}/versions/{version_id}"
    )

    # Configure client options with the quota project and regional endpoint
    client_options = {"quota_project_id": project_id}
    if location_id and location_id != "global":
        client_options["api_endpoint"] = f"{location_id}-dialogflow.googleapis.com"

    playbooks_client = dialogflowcx_v3.PlaybooksClient(
        client_options=client_options
    )

    request = dialogflowcx_v3.GetPlaybookVersionRequest(name=name)

    try:
        response = playbooks_client.get_playbook_version(request=request)
        print(f"Playbook version name: {response.name}")
        print(f"Description: {response.description}")
    except GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_playbooks_playbookversion_get]
