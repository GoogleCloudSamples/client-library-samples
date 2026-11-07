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

# [START run_v2_jobs_job_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.JobsClient()


def get_job(project_id: str, location_id: str, job_id: str) -> None:
    """Use the get_job method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        job_id: ID of the Job (for example, 'example-job-id')
    """
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    request = run_v2.GetJobRequest(name=name)

    try:
        response = client.get_job(request=request)
        print(f"Retrieved job: {response.name}")
        print(f"Execution count: {response.execution_count}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve job: {e}")
# [END run_v2_jobs_job_get]
