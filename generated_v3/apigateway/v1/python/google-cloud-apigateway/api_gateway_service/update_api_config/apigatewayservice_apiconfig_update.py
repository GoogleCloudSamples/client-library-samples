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

# [START apigateway_v1_apigatewayservice_apiconfig_update]
import google.api_core.exceptions
from google.cloud import apigateway_v1
from google.protobuf import field_mask_pb2

client = apigateway_v1.ApiGatewayServiceClient()


def update_api_config(project_id: str, api_id: str, api_config_id: str) -> None:
    """Updates an API config display name.

    Args:
        project_id: The Google Cloud project ID.
        api_id: The ID of the parent API.
        api_config_id: The ID of the API config to update.
    """
    api_config_name = (
        f"projects/{project_id}/locations/global/apis/{api_id}/configs/{api_config_id}"
    )
    api_config = apigateway_v1.ApiConfig(
        name=api_config_name,
        display_name="Updated Sample API Config",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_api_config(
            api_config=api_config,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated API config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update API config: {e}")
# [END apigateway_v1_apigatewayservice_apiconfig_update]
