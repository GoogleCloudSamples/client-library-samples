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

# [START networkservices_v1_networkservices_agentgateway_delete]
import google.api_core.exceptions
from google.cloud import network_services_v1


def delete_agent_gateway(
    project_id: str, location_id: str, agent_gateway_id: str
) -> None:
    """Deletes an Agent Gateway resource in Google Cloud Network Services.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        agent_gateway_id: The ID of the agent gateway to delete.
    """
    client = network_services_v1.NetworkServicesClient()

    name = client.agent_gateway_path(project_id, location_id, agent_gateway_id)

    request = network_services_v1.DeleteAgentGatewayRequest(
        name=name,
    )

    try:
        operation = client.delete_agent_gateway(request=request)
        print("Waiting for operation to complete...")
        operation.result()
        print(f"Deleted agent gateway: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error deleting agent gateway: {e}")


# [END networkservices_v1_networkservices_agentgateway_delete]
