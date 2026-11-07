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

# [START storagebatchoperations_v1_storagebatchoperations_jobs_list]
import google.api_core.exceptions
from google.cloud import storagebatchoperations_v1


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists batch jobs in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (must be 'global').
    """
    client = storagebatchoperations_v1.StorageBatchOperationsClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = storagebatchoperations_v1.ListJobsRequest(parent=parent)
        page_result = client.list_jobs(request=request)

        job_count = 0
        for job in page_result:
            print(f"Job name: {job.name}")
            print(f"Job state: {job.state}")
            job_count += 1

        if job_count == 0:
            print(f"No batch jobs found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END storagebatchoperations_v1_storagebatchoperations_jobs_list]
