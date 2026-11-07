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

# [START osconfig_v1_osconfigservice_patchjobs_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigServiceClient()


def list_patch_jobs(project_id: str) -> None:
    """Use the list_patch_jobs method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}"

    request = osconfig_v1.ListPatchJobsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_patch_jobs(request=request)
        for patch_job in page_result:
            print(f"Patch job: {patch_job.name}, State: {patch_job.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API error encountered: {error}")


# [END osconfig_v1_osconfigservice_patchjobs_list]
