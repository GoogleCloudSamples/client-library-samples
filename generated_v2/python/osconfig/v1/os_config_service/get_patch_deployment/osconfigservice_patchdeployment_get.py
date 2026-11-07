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

# [START osconfig_v1_osconfigservice_patchdeployment_get]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def get_patch_deployment(project_id: str, patch_deployment_id: str) -> None:
    """Get details of an OS Config patch deployment.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        patch_deployment_id: ID of the PatchDeployment (for example, 'example-patchdeployment-id')
    """
    name = client.patch_deployment_path(project_id, patch_deployment_id)

    try:
        request = osconfig_v1.GetPatchDeploymentRequest(
            name=name,
        )
        response = client.get_patch_deployment(request=request)
        print(f"Patch deployment retrieved: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get patch deployment: {error}")
# [END osconfig_v1_osconfigservice_patchdeployment_get]
