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

# [START cloudscheduler_v1beta1_cloudscheduler_job_create]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import scheduler_v1beta1


def create_job(project_id: str, location_id: str) -> None:
    """Creates a scheduled job in Cloud Scheduler using the v1beta1 API.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the job is created.
    """
    client = scheduler_v1beta1.CloudSchedulerClient()

    parent = client.common_location_path(project_id, location_id)

    job = scheduler_v1beta1.Job(
        http_target=scheduler_v1beta1.HttpTarget(
            uri="https://example.com/ping",
            http_method=scheduler_v1beta1.HttpMethod.GET,
        ),
        schedule="0 * * * *",
        time_zone="UTC",
    )

    try:
        response = client.create_job(parent=parent, job=job)
        print(f"Created job: {response.name}")
    except GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END cloudscheduler_v1beta1_cloudscheduler_job_create]
