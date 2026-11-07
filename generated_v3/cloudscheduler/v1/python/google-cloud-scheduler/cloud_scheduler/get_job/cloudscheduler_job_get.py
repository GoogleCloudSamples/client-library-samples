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

# [START cloudscheduler_v1_cloudscheduler_job_get]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import scheduler_v1


def get_job(project_id: str, location_id: str, job_id: str) -> None:
    """Gets details of a Cloud Scheduler job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the job is located (for example, 'us-central1').
        job_id: The ID of the job (for example, 'example-job-id').
    """
    client = scheduler_v1.CloudSchedulerClient()

    name = client.job_path(project_id, location_id, job_id)

    request = scheduler_v1.GetJobRequest(
        name=name,
    )

    try:
        response = client.get_job(request=request)
        print(f"Job details retrieved: {response.name}")
        print(f"Schedule: {response.schedule}")
        print(f"Time zone: {response.time_zone}")
        print(f"State: {response.state}")
    except GoogleAPICallError as e:
        print(f"Failed to retrieve job due to API error: {e}")


# [END cloudscheduler_v1_cloudscheduler_job_get]
