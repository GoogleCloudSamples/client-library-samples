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

# [START clouddeploy_v1_clouddeploy_customtargettype_update]
import google.api_core.exceptions
from google.cloud import deploy_v1
from google.protobuf import field_mask_pb2


def update_custom_target_type(
    project_id: str, location_id: str, custom_target_type_id: str
) -> None:
    """Updates an existing CustomTargetType resource.

    Args:
        project_id: The Google Cloud project ID hosting the CustomTargetType.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        custom_target_type_id: The identifier of the CustomTargetType to update.
    """
    client = deploy_v1.CloudDeployClient()

    custom_target_type = deploy_v1.CustomTargetType(
        name=f"projects/{project_id}/locations/{location_id}/customTargetTypes/{custom_target_type_id}",
        description="Updated custom target type description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_custom_target_type(
            custom_target_type=custom_target_type,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated custom target type: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END clouddeploy_v1_clouddeploy_customtargettype_update]
