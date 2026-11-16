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

# [START run_v2_jobs_jobs_list]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.JobsClient()


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Cloud Run jobs in a specified Google Cloud project and region.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the jobs are located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = run_v2.ListJobsRequest(
        parent=parent,
    )

    try:
        response = client.list_jobs(request=request)
        for job in response:
            print(f"Job: {job.name}")
    except google.api_core.exceptions.GoogleAPIError as err:
        print(f"Failed to list jobs: {err}")
# [END run_v2_jobs_jobs_list]
