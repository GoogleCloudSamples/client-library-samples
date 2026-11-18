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

# [START dialogflow_v3_agents_agent_update]
import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3
from google.protobuf import field_mask_pb2


def update_agent(project_id: str, location_id: str, agent_id: str) -> None:
    """Updates an existing Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the agent (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent.
    """
    client_options = None
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-dialogflow.googleapis.com"
        )
    client = dialogflowcx_v3.AgentsClient(client_options=client_options)

    agent = dialogflowcx_v3.Agent(
        name=f"projects/{project_id}/locations/{location_id}/agents/{agent_id}",
        description="Updated agent description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_agent(agent=agent, update_mask=update_mask)
        print(f"Updated agent name: {response.name}")
        print(f"Updated agent description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3_agents_agent_update]
