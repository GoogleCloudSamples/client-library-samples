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

# [START run_v2_tasks_task_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.TasksClient()


def get_task(
    project_id: str,
    location_id: str,
    job_id: str,
    execution_id: str,
    task_id: str,
) -> None:
    """Gets details of a Cloud Run task.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        job_id: ID of the Job (for example, 'example-job-id')
        execution_id: ID of the Execution (for example, 'example-execution-id')
        task_id: ID of the Task (for example, 'example-task-id')
    """
    name = client.task_path(project_id, location_id, job_id, execution_id, task_id)
    request = run_v2.GetTaskRequest(name=name)

    try:
        response = client.get_task(request=request)
        print(f"Task name: {response.name}")
        print(f"Task index: {response.index}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to get task: {error}")
# [END run_v2_tasks_task_get]
