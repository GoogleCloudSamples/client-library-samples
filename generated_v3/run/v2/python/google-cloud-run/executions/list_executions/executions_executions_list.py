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

# [START run_v2_executions_executions_list]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ExecutionsClient()


def list_executions(project_id: str, location_id: str, job_id: str) -> None:
    """Lists executions for a Cloud Run job.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region of the Cloud Run job (for example, 'us-central1').
        job_id: The ID of the Cloud Run job (for example, 'example-job'), or '-' to list executions across all jobs.
    """
    parent = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        response = client.list_executions(parent=parent)
        for execution in response:
            print(f"Execution name: {execution.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list executions: {error}")
# [END run_v2_executions_executions_list]
