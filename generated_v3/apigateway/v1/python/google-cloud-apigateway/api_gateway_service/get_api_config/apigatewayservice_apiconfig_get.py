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

# [START apigateway_v1_apigatewayservice_apiconfig_get]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def get_api_config(project_id: str, api_id: str, api_config_id: str) -> None:
    """Use the get_api_config method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        api_id: Identifier of the parent API (for example, 'example-api-id').
        api_config_id: Identifier of the API Config (for example, 'example-config-id').
    """
    name = (
        f"projects/{project_id}/locations/global/apis/{api_id}/configs/{api_config_id}"
    )

    request = apigateway_v1.GetApiConfigRequest(name=name)

    try:
        response = client.get_api_config(request=request)
        print(f"API Config name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve API config: {error}")
# [END apigateway_v1_apigatewayservice_apiconfig_get]
