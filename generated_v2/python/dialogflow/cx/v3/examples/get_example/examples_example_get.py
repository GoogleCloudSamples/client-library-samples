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

# [START dialogflow_v3_examples_example_get]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3


def get_example(
    project_id: str,
    location_id: str,
    agent_id: str,
    playbook_id: str,
    example_id: str,
) -> None:
    """Retrieves an example from a Dialogflow CX playbook.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: Server-generated ID of the Dialogflow CX agent (for example, 'example-agent-id').
        playbook_id: Server-generated ID of the Playbook (for example, 'example-playbook-id').
        example_id: Server-generated ID of the Example (for example, 'example-example-id').
    """
    client_options = None
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-dialogflow.googleapis.com"
        )

    client = dialogflowcx_v3.ExamplesClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"playbooks/{playbook_id}/examples/{example_id}"
    )

    request = dialogflowcx_v3.GetExampleRequest(
        name=name,
    )

    try:
        response = client.get_example(request=request)
        print(f"Example name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_examples_example_get]
