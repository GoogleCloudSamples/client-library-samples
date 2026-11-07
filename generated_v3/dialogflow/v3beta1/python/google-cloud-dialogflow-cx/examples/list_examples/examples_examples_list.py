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

# [START dialogflow_v3beta1_examples_examples_list]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1


def list_examples(
    project_id: str, location_id: str, agent_id: str, playbook_id: str
) -> None:
    """Lists examples in a Playbook.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
        playbook_id: The ID of the playbook (for example, 'example-playbook-id').
    """
    if location_id and location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        client = dialogflowcx_v3beta1.ExamplesClient(client_options=client_options)
    else:
        client = dialogflowcx_v3beta1.ExamplesClient()

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/playbooks/{playbook_id}"

    request = dialogflowcx_v3beta1.ListExamplesRequest(
        parent=parent,
    )

    try:
        response = client.list_examples(request=request)
        for example in response:
            print(f"Example name: {example.name}")
            print(f"Example display name: {example.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3beta1_examples_examples_list]
