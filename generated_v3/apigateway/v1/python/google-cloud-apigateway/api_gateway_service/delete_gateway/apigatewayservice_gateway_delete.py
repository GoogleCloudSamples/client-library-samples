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

# [START apigateway_v1_apigatewayservice_gateway_delete]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def delete_gateway(project_id: str, location_id: str, gateway_id: str) -> None:
    """Deletes an API Gateway.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        gateway_id: The caller-chosen ID of the Gateway to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/gateways/{gateway_id}"

    request = apigateway_v1.DeleteGatewayRequest(name=name)

    try:
        # DeleteGateway initiates a long-running operation.
        operation = client.delete_gateway(request=request)
        operation.result()
        print(f"Deleted gateway: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete gateway: {error}")
# [END apigateway_v1_apigatewayservice_gateway_delete]
