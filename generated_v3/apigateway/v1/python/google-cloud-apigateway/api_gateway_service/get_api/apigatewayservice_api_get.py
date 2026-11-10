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

# [START apigateway_v1_apigatewayservice_api_get]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def get_api(project_id: str, api_id: str) -> None:
    """Retrieves metadata for an API in API Gateway.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        api_id: The identifier of the API to retrieve (for example, 'example-api-id').
    """
    name = client.api_path(project_id, api_id)

    request = apigateway_v1.GetApiRequest(
        name=name,
    )

    try:
        response = client.get_api(request=request)
        print(f"Retrieved API: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e.message}")
# [END apigateway_v1_apigatewayservice_api_get]
