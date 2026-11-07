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

# [START dialogflow_v3beta1_generators_generators_list]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3beta1


def list_generators(project_id: str, location_id: str, agent_id: str) -> None:
    """Lists generators in the specified agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The ID of the agent (for example, 'example-agent-id').
    """
    api_endpoint = (
        f"{location_id}-dialogflow.googleapis.com"
        if location_id != "global"
        else None
    )
    client_options = ClientOptions(
        api_endpoint=api_endpoint,
        quota_project_id=project_id,
    )
    client = dialogflowcx_v3beta1.GeneratorsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    request = dialogflowcx_v3beta1.ListGeneratorsRequest(
        parent=parent,
    )

    try:
        response = client.list_generators(request=request)
        for generator in response:
            print(f"Generator Name: {generator.name}")
            print(f"Display Name: {generator.display_name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3beta1_generators_generators_list]
