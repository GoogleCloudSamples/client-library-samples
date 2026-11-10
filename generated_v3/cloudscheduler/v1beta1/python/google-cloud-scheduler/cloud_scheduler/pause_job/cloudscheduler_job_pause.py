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

# [START cloudscheduler_pause_job]
from google.api_core import exceptions
from google.cloud import scheduler_v1beta1


def pause_job(project_id: str, location_id: str, job_id: str) -> None:
    """Pauses a Cloud Scheduler job.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID.
        job_id: The Cloud Scheduler job ID.
    """
    client = scheduler_v1beta1.CloudSchedulerClient()

    name = client.job_path(project_id, location_id, job_id)

    request = scheduler_v1.PauseJobRequest(
        name=name,
    )

    try:
        response = client.pause_job(request=request)
        print(f"Paused job: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to pause job: {e}")


# [END cloudscheduler_pause_job]
