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

# [START networkservices_v1_networkservices_agentgateway_create]
import google.api_core.exceptions
from google.cloud import network_services_v1


def create_agent_gateway(
    project_id: str, location_id: str, agent_gateway_id: str
) -> None:
    """Creates an Agent Gateway resource in Google Cloud.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        agent_gateway_id: The ID of the Agent Gateway to create (for example, 'example-agent-gateway-id').
    """
    client = network_services_v1.NetworkServicesClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    agent_gateway = network_services_v1.AgentGateway(
        description="Example Agent Gateway",
    )

    try:
        operation = client.create_agent_gateway(
            parent=parent,
            agent_gateway=agent_gateway,
            agent_gateway_id=agent_gateway_id,
        )
        response = operation.result()
        print(f"Created Agent Gateway: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create Agent Gateway: {e}")
# [END networkservices_v1_networkservices_agentgateway_create]
