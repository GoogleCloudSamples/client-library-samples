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

# [START apigateway_v1_apigatewayservice_api_delete]
import google.api_core.exceptions
from google.cloud import apigateway_v1

client = apigateway_v1.ApiGatewayServiceClient()


def delete_api(project_id: str, api_id: str) -> None:
    """Deletes an API in API Gateway.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        api_id: ID of the Api (for example, 'example-api-id')
    """
    name = client.api_path(project_id, api_id)

    request = apigateway_v1.DeleteApiRequest(
        name=name,
    )

    try:
        operation = client.delete_api(request=request)
        operation.result()
        print(f"Deleted API: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API deletion failed: {e}")
# [END apigateway_v1_apigatewayservice_api_delete]
