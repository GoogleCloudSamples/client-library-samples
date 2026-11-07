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

# [START cloudscheduler_v1_cloudscheduler_jobs_list]
from google.api_core import exceptions
from google.cloud import scheduler_v1


def list_jobs(project_id: str, location_id: str) -> None:
    """Lists Cloud Scheduler jobs in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = scheduler_v1.CloudSchedulerClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = scheduler_v1.ListJobsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_jobs(request=request)
        for job in page_result:
            print(f"Job: {job.name}")
            print(f"Schedule: {job.schedule}")
            print(f"State: {job.state.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END cloudscheduler_v1_cloudscheduler_jobs_list]
