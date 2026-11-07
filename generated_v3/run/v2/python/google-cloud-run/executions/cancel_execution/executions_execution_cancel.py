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

# [START run_v2_executions_execution_cancel]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.ExecutionsClient()


def cancel_execution(
    project_id: str, location_id: str, job_id: str, execution_id: str
) -> None:
    """Cancels an active Cloud Run execution.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Cloud Run Job and Execution reside (for example, 'us-central1').
        job_id: The identifier of the parent Cloud Run Job (for example, 'example-job').
        execution_id: The server-generated identifier of the Cloud Run Execution to cancel (for example, 'example-execution').
    """
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}/executions/{execution_id}"

    request = run_v2.CancelExecutionRequest(name=name)

    try:
        # CancelExecution initiates a long-running operation
        operation = client.cancel_execution(request=request)
        response = operation.result()
        print(f"Cancelled execution: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to cancel execution: {e}")
# [END run_v2_executions_execution_cancel]
