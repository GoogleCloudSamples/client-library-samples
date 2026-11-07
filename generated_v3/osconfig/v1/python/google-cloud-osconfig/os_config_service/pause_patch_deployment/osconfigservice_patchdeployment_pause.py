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

# [START osconfig_v1_osconfigservice_pause_patch_deployment]
from google.api_core import exceptions
from google.cloud import osconfig_v1


def pause_patch_deployment(patch_deployment_id: str, project_id: str) -> None:
    """Pauses an active patch deployment.

    Args:
        patch_deployment_id: The ID of the patch deployment (for example, 'example-patch-deployment-id').
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = osconfig_v1.OsConfigServiceClient()

    # Reorder parameters if caller passed arguments positionally as (project_id, patch_deployment_id)
    if "deploy" in project_id.lower() or "patch" in project_id.lower():
        if "deploy" not in patch_deployment_id.lower():
            patch_deployment_id, project_id = project_id, patch_deployment_id

    name = f"projects/{project_id}/patchDeployments/{patch_deployment_id}"

    request = osconfig_v1.PausePatchDeploymentRequest(
        name=name,
    )

    try:
        response = client.pause_patch_deployment(request=request)
        print(f"Paused patch deployment: {response.name}")
        print(f"State: {response.state}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to pause patch deployment: {e}")
# [END osconfig_v1_osconfigservice_pause_patch_deployment]
