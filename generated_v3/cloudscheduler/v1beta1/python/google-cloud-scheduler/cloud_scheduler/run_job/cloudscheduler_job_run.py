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

# [START cloudscheduler_run_job]
import google.api_core.exceptions
from google.cloud import scheduler_v1beta1


def run_job(project_id: str, location_id: str, job_id: str) -> None:
    """Runs a Cloud Scheduler job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        job_id: The ID of the existing Cloud Scheduler job to run (for example, 'example-job').
    """
    client = scheduler_v1beta1.CloudSchedulerClient()

    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    request = scheduler_v1.RunJobRequest(name=name)

    try:
        response = client.run_job(request=request)
        print(f"Executed job: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to run job: {error}")
# [END cloudscheduler_run_job]
