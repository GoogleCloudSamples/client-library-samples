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

# [START dialogflow_v3_transitionroutegroups_transitionroutegroups_list]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def list_transition_route_groups(
    project_id: str, location_id: str, agent_id: str, flow_id: str
) -> None:
    """Lists transition route groups in a flow.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID.
        agent_id: The Dialogflow CX agent ID.
        flow_id: The Dialogflow CX flow ID.
    """
    client_options = None
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}

    client = dialogflowcx_v3.TransitionRouteGroupsClient(client_options=client_options)

    parent = (
        f"projects/{project_id}/locations/{location_id}/agents/{agent_id}/flows/{flow_id}"
    )

    request = dialogflowcx_v3.ListTransitionRouteGroupsRequest(
        parent=parent,
    )

    try:
        response = client.list_transition_route_groups(request=request)
        for transition_route_group in response:
            print(f"Transition route group name: {transition_route_group.name}")
            print(f"Display name: {transition_route_group.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dialogflow_v3_transitionroutegroups_transitionroutegroups_list]
