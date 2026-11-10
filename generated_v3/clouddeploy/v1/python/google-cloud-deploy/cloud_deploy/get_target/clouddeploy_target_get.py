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

# [START clouddeploy_v1_clouddeploy_target_get]
from google.api_core import exceptions
from google.cloud import deploy_v1


def get_target(project_id: str, location_id: str, target_id: str) -> None:
    """Retrieves a Cloud Deploy target.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        target_id: The ID of the Cloud Deploy target.
    """
    client = deploy_v1.CloudDeployClient()

    name = f"projects/{project_id}/locations/{location_id}/targets/{target_id}"

    request = deploy_v1.GetTargetRequest(name=name)

    try:
        response = client.get_target(request=request)
        print(f"Target retrieved: {response.name}")
        print(f"Target UID: {response.uid}")
        print(f"Target create time: {response.create_time}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to get target: {e}")
# [END clouddeploy_v1_clouddeploy_target_get]
