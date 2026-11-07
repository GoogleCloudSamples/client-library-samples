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

# [START cloudscheduler_v1_cloudscheduler_job_create]
import google.api_core.exceptions
from google.cloud import scheduler_v1


def create_job(project_id: str, location_id: str) -> None:
    """Creates a job using Cloud Scheduler.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = scheduler_v1.CloudSchedulerClient()
    parent = client.common_location_path(project_id, location_id)

    job = scheduler_v1.Job(
        description="Example job scheduled via Cloud Scheduler",
        schedule="* * * * *",
        time_zone="UTC",
        http_target=scheduler_v1.HttpTarget(
            uri="https://example.com/ping",
            http_method=scheduler_v1.HttpMethod.GET,
        ),
    )

    try:
        response = client.create_job(parent=parent, job=job)
        print(f"Created job: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create job: {error}")
# [END cloudscheduler_v1_cloudscheduler_job_create]
