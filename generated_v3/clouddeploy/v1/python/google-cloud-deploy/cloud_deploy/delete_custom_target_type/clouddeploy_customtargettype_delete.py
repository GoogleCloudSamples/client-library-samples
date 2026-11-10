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

# [START clouddeploy_v1_clouddeploy_customtargettype_delete]
import google.api_core.exceptions
from google.cloud import deploy_v1


def delete_custom_target_type(
    project_id: str, custom_target_type_id: str, location_id: str
) -> None:
    """Deletes a custom target type.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        custom_target_type_id: The ID of the custom target type to delete (for
            example, 'example-custom-target-type').
        location_id: The Google Cloud region containing the CustomTargetType
            (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"customTargetTypes/{custom_target_type_id}"
    )

    try:
        operation = client.delete_custom_target_type(name=name)
        operation.result()
        print(f"Deleted custom target type: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete custom target type: {e}")
# [END clouddeploy_v1_clouddeploy_customtargettype_delete]
