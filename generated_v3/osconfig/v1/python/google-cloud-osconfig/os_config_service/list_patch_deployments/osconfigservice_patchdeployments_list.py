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

# [START osconfig_v1_osconfigservice_patchdeployments_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def list_patch_deployments(project_id: str) -> None:
    """Lists patch deployments in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}"

    request = osconfig_v1.ListPatchDeploymentsRequest(
        parent=parent,
    )

    try:
        response = client.list_patch_deployments(request=request)
        for patch_deployment in response:
            print(f"Deployment Name: {patch_deployment.name}")
            print(f"Description: {patch_deployment.description}")
            print(f"Schedule: {patch_deployment.recurring_schedule}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END osconfig_v1_osconfigservice_patchdeployments_list]
