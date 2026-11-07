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

# [START osconfig_v1_osconfigservice_execute_patch_job]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def execute_patch_job(project_id: str) -> None:
    """Execute an OS patch job on Compute Engine instances.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    parent = f"projects/{project_id}"
    instance_filter = osconfig_v1.PatchInstanceFilter(all_=True)

    request = osconfig_v1.ExecutePatchJobRequest(
        parent=parent,
        instance_filter=instance_filter,
    )

    try:
        response = client.execute_patch_job(request=request)
        print(f"Patch job name: {response.name}")
        print(f"Patch job state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END osconfig_v1_osconfigservice_execute_patch_job]
