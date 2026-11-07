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
from google.api_core import exceptions
from google.cloud import scheduler_v1


def run_job(project_id: str, location_id: str, job_id: str) -> None:
    """Run a Cloud Scheduler job immediately.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        job_id: The identifier of the job (for example, 'example-job-id').
    """
    client = scheduler_v1.CloudSchedulerClient()

    name = client.job_path(project_id, location_id, job_id)
    request = scheduler_v1.RunJobRequest(name=name)

    try:
        response = client.run_job(request=request)
        print(f"Triggered job: {response.name}")
        print(f"Job state: {response.state.name}")
    except exceptions.PermissionDenied as error:
        print(f"Permission denied: {error}")
    except exceptions.NotFound as error:
        print(f"Job not found: {error}")
# [END cloudscheduler_run_job]
