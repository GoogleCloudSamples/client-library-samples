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

# [START run_v2_jobs_job_update]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.JobsClient()


def update_job(project_id: str, location_id: str, job_id: str) -> None:
    """Updates an existing Cloud Run job by modifying its labels.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Cloud Run job is hosted.
        job_id: The caller-chosen ID of the Cloud Run job to update.
    """
    job_name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        # Fetch the existing job to preserve current configuration and etag
        job = client.get_job(name=job_name)
        job.labels["updated"] = "true"

        request = run_v2.UpdateJobRequest(job=job)
        operation = client.update_job(request=request)
        response = operation.result()

        print(f"Updated job: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update job: {error}")
# [END run_v2_jobs_job_update]
