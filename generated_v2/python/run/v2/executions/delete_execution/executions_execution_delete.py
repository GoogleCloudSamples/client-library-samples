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

# [START run_v2_executions_execution_delete]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ExecutionsClient()


def delete_execution(project_id: str, location_id: str, job_id: str, execution_id: str) -> None:
    """Use the delete_execution method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the Cloud Run job execution is located (for example, 'us-central1').
        job_id: The ID of the parent Cloud Run job.
        execution_id: The server-generated ID of the Cloud Run execution to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}/executions/{execution_id}"

    request = run_v2.DeleteExecutionRequest(name=name)

    try:
        operation = client.delete_execution(request=request)
        response = operation.result()
        print(f"Deleted execution: {response.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Execution not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete execution: {error.message}")
# [END run_v2_executions_execution_delete]
