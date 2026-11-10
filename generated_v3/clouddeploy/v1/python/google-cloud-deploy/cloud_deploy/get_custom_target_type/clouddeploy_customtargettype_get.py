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

# [START clouddeploy_v1_clouddeploy_customtargettype_get]
from google.api_core import exceptions
from google.cloud import deploy_v1


def get_custom_target_type(
    project_id: str, custom_target_type_id: str, location_id: str
) -> None:
    """Retrieve an existing CustomTargetType resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        custom_target_type_id: The identifier of the CustomTargetType (for example, 'example-custom-target-type').
        location_id: The Google Cloud region ID (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    name = f"projects/{project_id}/locations/{location_id}/customTargetTypes/{custom_target_type_id}"

    try:
        response = client.get_custom_target_type(name=name)
        print(f"Custom target type retrieved: {response.name}")
        print(f"Custom target type UID: {response.uid}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END clouddeploy_v1_clouddeploy_customtargettype_get]
