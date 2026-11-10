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

# [START clouddeploy_v1_clouddeploy_targets_list]
import google.api_core.exceptions
from google.cloud import deploy_v1


def list_targets(project_id: str) -> None:
    """Lists deployment targets in a given Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = deploy_v1.CloudDeployClient()

    location_name = "us-central1"
    parent = f"projects/{project_id}/locations/{location_name}"

    request = deploy_v1.ListTargetsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_targets(request=request)
        for target in page_result:
            print(f"Target name: {target.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END clouddeploy_v1_clouddeploy_targets_list]
