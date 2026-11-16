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

# [START osconfig_v1_osconfigservice_patchjobinstancedetails_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1


def list_patch_job_instance_details(project_id: str, patch_job_id: str) -> None:
    """List instance details for an OS Config patch job.

    Args:
        project_id: The Google Cloud project ID.
        patch_job_id: The server-generated ID of the patch job. Obtain this ID
          from the name field of an existing PatchJob resource.
    """
    client = osconfig_v1.OsConfigServiceClient()
    parent = f"projects/{project_id}/patchJobs/{patch_job_id}"

    try:
        response = client.list_patch_job_instance_details(parent=parent)
        count = 0
        for instance_detail in response:
            count += 1
            print(f"Instance Name: {instance_detail.name}")
            print(f"State: {instance_detail.state}")

        if count == 0:
            print(f"No instance details found for patch job: {patch_job_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END osconfig_v1_osconfigservice_patchjobinstancedetails_list]
