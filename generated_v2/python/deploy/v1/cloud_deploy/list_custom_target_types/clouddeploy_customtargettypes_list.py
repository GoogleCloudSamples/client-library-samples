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

# [START clouddeploy_v1_clouddeploy_customtargettypes_list]
from google.api_core import exceptions
from google.cloud import deploy_v1


def list_custom_target_types(project_id: str, location_id: str) -> None:
    """Lists custom target types in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = deploy_v1.ListCustomTargetTypesRequest(
            parent=parent,
        )
        page_result = client.list_custom_target_types(request=request)

        for custom_target_type in page_result:
            print(f"Custom target type: {custom_target_type.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error listing custom target types: {error}")
# [END clouddeploy_v1_clouddeploy_customtargettypes_list]
