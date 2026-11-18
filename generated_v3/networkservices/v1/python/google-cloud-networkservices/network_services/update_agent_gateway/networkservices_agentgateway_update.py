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

# [START networkservices_v1_networkservices_agentgateway_update]
import google.api_core.exceptions
from google.cloud import network_services_v1
from google.protobuf import field_mask_pb2


def update_agent_gateway(
    project_id: str, location_id: str, agent_gateway_id: str
) -> None:
    """Updates an existing AgentGateway resource.

    Args:
        project_id: The Google Cloud project ID containing the AgentGateway resource.
        location_id: The Google Cloud location of the AgentGateway resource.
        agent_gateway_id: The resource identifier of the existing AgentGateway.
    """
    client = network_services_v1.NetworkServicesClient()

    gateway_name = (
        f"projects/{project_id}/locations/{location_id}/agentGateways/{agent_gateway_id}"
    )
    agent_gateway = network_services_v1.AgentGateway(
        name=gateway_name,
        description="Updated description for the Agent Gateway",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_agent_gateway(
            agent_gateway=agent_gateway,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated Agent Gateway: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networkservices_v1_networkservices_agentgateway_update]
