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

# [START cloudscheduler_delete_job]
from google.api_core import exceptions
from google.cloud import scheduler_v1


def delete_job(project_id: str, location_id: str, job_id: str) -> None:
    """Deletes a Cloud Scheduler job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        job_id: The job ID (for example, 'example-job-id').
    """
    client = scheduler_v1.CloudSchedulerClient()
    name = client.job_path(project_id, location_id, job_id)

    try:
        client.delete_job(name=name)
        print(f"Deleted job: {name}")
    except exceptions.GoogleAPIError as e:
        print(f"Failed to delete job: {e}")
# [END cloudscheduler_delete_job]
