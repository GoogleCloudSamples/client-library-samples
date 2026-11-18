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

# [START networkservices_v1_networkservices_agentgateway_get]
import google.api_core.exceptions
from google.cloud import network_services_v1


def get_agent_gateway(
    project_id: str, location_id: str, agent_gateway_id: str
) -> None:
    """Retrieves an Agent Gateway resource.

    Args:
        project_id: The Google Cloud project ID where the AgentGateway is hosted.
        location_id: The Google Cloud location (region) where the AgentGateway is hosted (for example, 'us-central1').
        agent_gateway_id: The resource ID of the AgentGateway to retrieve (for example, 'example-agent-gateway').
    """
    client = network_services_v1.NetworkServicesClient()
    name = f"projects/{project_id}/locations/{location_id}/agentGateways/{agent_gateway_id}"

    try:
        request = network_services_v1.GetAgentGatewayRequest(name=name)
        response = client.get_agent_gateway(request=request)
        print(f"Retrieved Agent Gateway: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve Agent Gateway: {e}")
# [END networkservices_v1_networkservices_agentgateway_get]
