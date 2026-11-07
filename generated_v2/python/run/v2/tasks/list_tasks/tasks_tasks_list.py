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

# [START run_v2_tasks_tasks_list]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.TasksClient()


def list_tasks(
    project_id: str, location_id: str, job_id: str, execution_id: str
) -> None:
    """Lists tasks within a Cloud Run job execution.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Cloud Run resources are located (for example, 'us-central1').
        job_id: Caller-chosen ID of the Job (for example, 'example-job-id').
        execution_id: Server-generated ID of the Execution (for example, 'example-job-id-abc12').
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/jobs/{job_id}/executions/{execution_id}"
    )

    request = run_v2.ListTasksRequest(parent=parent)

    try:
        response = client.list_tasks(request=request)
        for task in response:
            print(f"Task: {task.name}")
            print(f"Index: {task.index}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END run_v2_tasks_tasks_list]
