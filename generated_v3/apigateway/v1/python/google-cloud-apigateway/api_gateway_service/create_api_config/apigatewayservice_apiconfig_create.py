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

# [START apigateway_v1_apigatewayservice_apiconfig_create]
import google.api_core.exceptions
from google.cloud import apigateway_v1


def create_api_config(project_id: str, api_id: str, api_config_id: str) -> None:
    """Creates an API config for an API in Google Cloud API Gateway.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        api_id: The ID of the API (for example, 'example-api-id').
        api_config_id: The ID of the API config (for example, 'example-apiconfig-id').
    """
    client = apigateway_v1.ApiGatewayServiceClient()

    parent = f"projects/{project_id}/locations/global/apis/{api_id}"

    openapi_spec = (
        b"swagger: '2.0'\n"
        b"info:\n"
        b"  title: Example API\n"
        b"  version: 1.0.0\n"
        b"schemes:\n"
        b"  - https\n"
        b"produces:\n"
        b"  - application/json\n"
        b"paths:\n"
        b"  /hello:\n"
        b"    get:\n"
        b"      summary: Hello endpoint\n"
        b"      operationId: hello\n"
        b"      x-google-backend:\n"
        b"        address: https://example.com\n"
        b"      responses:\n"
        b"        '200':\n"
        b"          description: A successful response\n"
        b"          schema:\n"
        b"            type: string\n"
    )
    openapi_file = apigateway_v1.ApiConfig.File(
        path="openapi.yaml",
        contents=openapi_spec,
    )
    openapi_document = apigateway_v1.ApiConfig.OpenApiDocument(
        document=openapi_file
    )
    api_config = apigateway_v1.ApiConfig(openapi_documents=[openapi_document])

    try:
        operation = client.create_api_config(
            parent=parent,
            api_config_id=api_config_id,
            api_config=api_config,
        )
        response = operation.result()
        print(f"Created API config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create API config: {error}")
# [END apigateway_v1_apigatewayservice_apiconfig_create]
