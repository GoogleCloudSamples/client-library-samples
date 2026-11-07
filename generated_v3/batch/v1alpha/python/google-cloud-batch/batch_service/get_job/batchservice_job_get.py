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

# [START batch_v1alpha_batchservice_job_get]
import google.api_core.exceptions
from google.cloud import batch_v1alpha

client = batch_v1alpha.BatchServiceClient()


def get_job(project_id: str, location_id: str, job_id: str) -> None:
    """Use the get_job method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Batch job is located.
        job_id: The ID of the Batch job. Can be caller-specified at creation or
          server-generated, obtained from CreateJob or ListJobs.
    """
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        response = client.get_job(name=name)
        print(f"Job retrieved: {response.name}")
        print(f"Job state: {response.status.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve job: {e}")
# [END batch_v1alpha_batchservice_job_get]
