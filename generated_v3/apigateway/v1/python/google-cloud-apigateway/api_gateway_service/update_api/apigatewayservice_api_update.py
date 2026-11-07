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

# [START apigateway_v1_apigatewayservice_api_update]
import google.api_core.exceptions
from google.cloud import apigateway_v1
from google.protobuf import field_mask_pb2

client = apigateway_v1.ApiGatewayServiceClient()


def update_api(project_id: str, api_id: str) -> None:
    """Updates an API in API Gateway.

    Args:
        project_id: The Google Cloud project ID.
        api_id: The user-defined identifier of the API to update.
    """
    api = apigateway_v1.Api(
        name=f"projects/{project_id}/locations/global/apis/{api_id}",
        display_name="Updated Example API",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_api(
            request=apigateway_v1.UpdateApiRequest(
                api=api,
                update_mask=update_mask,
            )
        )
        print("Waiting for update operation to complete...")
        response = operation.result()
        print(f"API updated successfully: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API update failed: {e}")
# [END apigateway_v1_apigatewayservice_api_update]
