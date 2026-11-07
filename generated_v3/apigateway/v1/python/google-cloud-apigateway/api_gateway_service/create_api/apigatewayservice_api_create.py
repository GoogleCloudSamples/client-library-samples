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

# [START apigateway_v1_apigatewayservice_api_create]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def create_api(project_id: str, api_id: str) -> None:
    """Use the create_api method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        api_id: ID of the Api (for example, 'example-api-id')
    """
    parent = f"projects/{project_id}/locations/global"
    api = apigateway_v1.Api(display_name="Example API")

    try:
        operation = client.create_api(parent=parent, api_id=api_id, api=api)
        response = operation.result()
        print(f"Created API: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END apigateway_v1_apigatewayservice_api_create]
