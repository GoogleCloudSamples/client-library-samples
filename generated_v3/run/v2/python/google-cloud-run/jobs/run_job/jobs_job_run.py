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

# [START run_v2_jobs_run_job]
from google.api_core import exceptions
from google.cloud import run_v2


def run_job(project_id: str, location_id: str, job_id: str) -> None:
    """Executes a Cloud Run job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the job is located (for example, 'us-central1').
        job_id: ID of the Cloud Run job (for example, 'example-job-id').
    """
    client = run_v2.JobsClient()

    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    request = run_v2.RunJobRequest(
        name=name,
    )

    try:
        operation = client.run_job(request=request)
        print(f"Triggered execution operation: {operation.operation.name}")

        response = operation.result()
        print(f"Completed execution: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to run job: {error}")


# [END run_v2_jobs_run_job]
