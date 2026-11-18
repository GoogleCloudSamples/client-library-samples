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

# [START networkservices_v1_networkservices_agentgateways_list]
from google.api_core import exceptions
from google.cloud import network_services_v1


def list_agent_gateways(project_id: str, location_id: str) -> None:
    """Lists Agent Gateways in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_services_v1.ListAgentGatewaysRequest(
        parent=parent,
    )

    try:
        response = client.list_agent_gateways(request=request)
        for agent_gateway in response:
            print(f"Agent Gateway Name: {agent_gateway.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list agent gateways: {error}")
# [END networkservices_v1_networkservices_agentgateways_list]
