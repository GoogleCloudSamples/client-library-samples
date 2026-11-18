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

# [START dialogflow_v3_agents_agent_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def get_agent(project_id: str, location_id: str, agent_id: str) -> None:
    """Retrieves a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent resides (for example, 'us-central1').
        agent_id: The server-generated ID of the agent (for example, '12345678-1234-1234-1234-123456789abc').
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.AgentsClient(client_options=client_options)

    name = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"

    request = dialogflowcx_v3.GetAgentRequest(
        name=name,
    )

    try:
        response = client.get_agent(request=request)
        print(f"Agent display name: {response.display_name}")
        print(f"Agent resource name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_agents_agent_get]
