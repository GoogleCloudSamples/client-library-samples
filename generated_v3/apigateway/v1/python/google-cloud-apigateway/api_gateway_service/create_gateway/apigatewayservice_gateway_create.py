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

# [START apigateway_v1_apigatewayservice_gateway_create]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def create_gateway(
    project_id: str,
    location_id: str,
    gateway_id: str,
    api_id: str,
    api_config_id: str,
) -> None:
    """Creates a new API Gateway in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        gateway_id: The caller-chosen ID to assign to the Gateway (for example, 'example-gateway').
        api_id: The ID of the existing API associated with the API Config (for example, 'example-api').
        api_config_id: The ID of the existing API Config that the Gateway serves (for example, 'example-config').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    api_config = (
        f"projects/{project_id}/locations/global/apis/{api_id}/configs/{api_config_id}"
    )

    gateway = apigateway_v1.Gateway(
        api_config=api_config,
        display_name="Sample Gateway",
    )

    try:
        # CreateGateway initiates a long-running operation
        operation = client.create_gateway(
            parent=parent,
            gateway_id=gateway_id,
            gateway=gateway,
        )
        response = operation.result()
        print(f"Created Gateway: {response.name}")
        print(f"Default hostname: {response.default_hostname}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create gateway: {error}")
# [END apigateway_v1_apigatewayservice_gateway_create]
