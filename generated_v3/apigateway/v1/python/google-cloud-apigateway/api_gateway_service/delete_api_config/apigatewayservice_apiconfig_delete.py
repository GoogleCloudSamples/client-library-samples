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

# [START apigateway_v1_apigatewayservice_apiconfig_delete]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def delete_api_config(project_id: str, api_id: str, api_config_id: str) -> None:
    """Deletes an API Config using the delete_api_config method.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        api_id: ID of the Api (for example, 'example-api-id')
        api_config_id: Caller-specified ID of the API Config (for example, 'example-config-id').
    """
    name = client.api_config_path(project_id, api_id, api_config_id)

    try:
        # DeleteApiConfig is a long-running operation; wait for it to complete.
        operation = client.delete_api_config(name=name)
        operation.result()
        print(f"Deleted API Config: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"API Config not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete API Config: {error}")
# [END apigateway_v1_apigatewayservice_apiconfig_delete]
