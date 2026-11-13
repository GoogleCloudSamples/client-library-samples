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

# [START osconfig_v1_osconfigservice_patchdeployment_delete]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def delete_patch_deployment(project_id: str, patch_deployment_id: str) -> None:
    """Deletes an OS Config patch deployment.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        patch_deployment_id: The ID of the patch deployment to delete (for
          example, 'example-patch-deployment'). Must start with a letter, end
          with a letter or number, contain only lowercase letters, numbers, and
          hyphens, and be 1-63 characters in length.
    """
    name = f"projects/{project_id}/patchDeployments/{patch_deployment_id}"

    request = osconfig_v1.DeletePatchDeploymentRequest(
        name=name,
    )

    try:
        client.delete_patch_deployment(request=request)
        print(f"Deleted patch deployment: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete patch deployment: {error}")
# [END osconfig_v1_osconfigservice_patchdeployment_delete]
