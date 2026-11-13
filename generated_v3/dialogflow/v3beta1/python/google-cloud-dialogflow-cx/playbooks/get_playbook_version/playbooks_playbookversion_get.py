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

# [START dialogflow_v3beta1_playbooks_playbookversion_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def get_playbook_version(
    project_id: str,
    location_id: str,
    agent_id: str,
    playbook_id: str,
    version_id: str,
) -> None:
    """Retrieves a specific version of a playbook in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        playbook_id: The ID of the playbook (for example, 'example-playbook-id').
        version_id: The ID of the version (for example, 'example-version-id').
    """
    # Regional endpoints are required for non-global Dialogflow CX agents.
    if location_id != "global":
        api_endpoint = f"{location_id}-dialogflow.googleapis.com"
        client = dialogflowcx_v3beta1.PlaybooksClient(
            client_options={"api_endpoint": api_endpoint}
        )
    else:
        client = dialogflowcx_v3beta1.PlaybooksClient()

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/playbooks/{playbook_id}/versions/{version_id}"
    request = dialogflowcx_v3beta1.GetPlaybookVersionRequest(name=name)

    try:
        response = client.get_playbook_version(request=request)
        print(f"Retrieved playbook version: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3beta1_playbooks_playbookversion_get]
