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

# [START dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3beta1

client = dialogflowcx_v3beta1.TransitionRouteGroupsClient()


def get_transition_route_group(
    project_id: str,
    location_id: str,
    agent_id: str,
    flow_id: str,
    transition_route_group_id: str,
) -> None:
    """Retrieves a transition route group in Dialogflow CX.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_id: The server-generated ID of the Dialogflow CX Agent.
        flow_id: The server-generated ID of the Flow.
        transition_route_group_id: The server-generated ID of the TransitionRouteGroup.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/"
        f"flows/{flow_id}/transitionRouteGroups/{transition_route_group_id}"
    )

    request = dialogflowcx_v3beta1.GetTransitionRouteGroupRequest(
        name=name,
    )

    try:
        response = client.get_transition_route_group(request=request)
        print(f"Retrieved transition route group: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3beta1_transitionroutegroups_transitionroutegroup_get]
