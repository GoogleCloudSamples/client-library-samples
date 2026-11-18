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

# [START dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_create]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import dialogflowcx_v3beta1


def create_transition_route_group(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Creates a transition route group in a Dialogflow CX flow.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the agent is located (for example, 'us-central1').
        agent_id: The identifier of the agent (for example, 'example-agent-id').
        flow_id: The identifier of the flow (for example, 'example-flow-id').
    """
    client_options = None
    if location_id != "global":
        client_options = ClientOptions(
            api_endpoint=f"{location_id}-dialogflow.googleapis.com"
        )

    client = dialogflowcx_v3beta1.TransitionRouteGroupsClient(
        client_options=client_options
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}"
        f"/flows/{flow_id}"
    )
    transition_route_group = dialogflowcx_v3beta1.TransitionRouteGroup(
        display_name="example-route-group"
    )

    try:
        response = client.create_transition_route_group(
            parent=parent,
            transition_route_group=transition_route_group,
        )
        print(f"Created transition route group: {response.name}")
        print(f"Display name: {response.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_create]
