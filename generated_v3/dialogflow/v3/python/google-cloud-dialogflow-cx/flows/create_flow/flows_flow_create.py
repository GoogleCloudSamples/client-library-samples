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

# [START dialogflow_v3_flows_flow_create]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import dialogflowcx_v3


def create_flow(project_id: str, location_id: str, agent_id: str) -> None:
    """Creates a flow in a Dialogflow CX agent.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or location ID where the agent is located (for example, 'global' or 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX agent. Read this from an existing Agent resource.
    """
    # Location-specific endpoints are required for regional Dialogflow CX agents
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    flow_client = dialogflowcx_v3.FlowsClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
    flow = dialogflowcx_v3.Flow(
        display_name="example-flow",
        description="Example flow for managing user interactions.",
    )

    request = dialogflowcx_v3.CreateFlowRequest(
        parent=parent,
        flow=flow,
    )

    try:
        response = flow_client.create_flow(request=request)
        print(f"Flow created: {response.name}")
        print(f"Display name: {response.display_name}")
    except GoogleAPICallError as e:
        print(f"Failed to create flow: {e}")
# [END dialogflow_v3_flows_flow_create]
