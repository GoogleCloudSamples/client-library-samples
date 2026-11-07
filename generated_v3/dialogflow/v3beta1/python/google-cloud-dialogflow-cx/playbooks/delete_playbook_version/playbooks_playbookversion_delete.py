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

# [START dialogflow_v3beta1_playbooks_playbookversion_delete]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def delete_playbook_version(
    project_id: str,
    location_id: str,
    agent_id: str,
    playbook_id: str,
    version_id: str,
) -> None:
    """Deletes a playbook version.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        agent_id: ID of the Agent (for example, 'example-agent-id').
        playbook_id: ID of the Playbook (for example, 'example-playbook-id').
        version_id: ID of the Version (for example, 'example-version-id').
    """
    client_options = ClientOptions(
        api_endpoint=(
            f"{location_id}-dialogflow.googleapis.com"
            if location_id != "global"
            else None
        ),
        quota_project_id=project_id,
    )
    client = dialogflowcx_v3beta1.PlaybooksClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"playbooks/{playbook_id}/versions/{version_id}"
    )

    request = dialogflowcx_v3beta1.DeletePlaybookVersionRequest(
        name=name,
    )

    try:
        client.delete_playbook_version(request=request)
        print(f"Deleted playbook version: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END dialogflow_v3beta1_playbooks_playbookversion_delete]
